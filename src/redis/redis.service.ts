import { Injectable, OnModuleInit } from '@nestjs/common'
import { createClient, RedisClientType, SchemaFieldTypes, VectorAlgorithms } from 'redis'
import { BIGFOOT_INDEX, BIGFOOT_PREFIX, REDIS_HOST, REDIS_PORT } from './config'

@Injectable()
export class RedisService implements OnModuleInit {
  private redis: RedisClientType

  async onModuleInit() {
    this.redis = createClient({ socket: { host: REDIS_HOST, port: REDIS_PORT } })
    this.redis.on('error', err => console.log('Redis Client Error', err))
    await this.redis.connect()

    // Wait for Redis to finish loading
    await this.waitForRedis()

    // Create index if needed
    if (!(await this.indexExists())) await this.createIndex()
  }

  async waitForRedis() {
    let loaded = false

    while (!loaded) {
      loaded = await this.isReady()
      if (!loaded) console.log('Redis is loading...')
    }

    console.log('Redis is ready!')
  }

  async isReady(): Promise<boolean> {
    const info = await this.redis.info('persistence')
    const lines = info.split('\r\n')
    const loadingLine = lines.find(line => line.startsWith('loading:'))
    const loadingValue = loadingLine.split(':')[1]
    return loadingValue === '0'
  }

  async indexExists(): Promise<boolean> {
    const indices = await this.redis.ft._list()
    return indices.includes(BIGFOOT_INDEX)
  }

  async createIndex() {
    await this.redis.ft.create(
      'bigfoot:sighting:index',
      {
        id: SchemaFieldTypes.TAG,
        title: SchemaFieldTypes.TEXT,
        observed: SchemaFieldTypes.TEXT,
        classification: SchemaFieldTypes.TAG,
        county: SchemaFieldTypes.TAG,
        state: SchemaFieldTypes.TAG,
        latlng: SchemaFieldTypes.GEO,
        highTemp: SchemaFieldTypes.NUMERIC,
        embedding: {
          type: SchemaFieldTypes.VECTOR,
          ALGORITHM: VectorAlgorithms.FLAT,
          TYPE: 'FLOAT32',
          DIM: 384,
          DISTANCE_METRIC: 'COSINE',
        },
      },
      {
        ON: 'HASH',
        PREFIX: `${BIGFOOT_PREFIX}:`,
      },
    )
  }
}
