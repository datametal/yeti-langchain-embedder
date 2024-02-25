import { Injectable, OnModuleInit, Logger } from '@nestjs/common'
import { createClient, RedisClientType } from 'redis'
import { REDIS_HOST, REDIS_PORT } from '../constants'

@Injectable()
export class RedisService implements OnModuleInit {
  private readonly logger = new Logger(RedisService.name)
  private redisClient: RedisClientType

  async onModuleInit(): Promise<void> {
    this.redisClient = createClient({
      socket: {
        host: REDIS_HOST,
        port: REDIS_PORT,
      },
    })

    this.redisClient.on('error', err => this.logger.error('Redis Client Error', err))

    await this.redisClient.connect()
    await this.waitForRedis()
  }

  private async waitForRedis(): Promise<void> {
    let loaded = false

    while (!loaded) {
      loaded = await this.isReady()
      if (!loaded) {
        this.logger.log('Redis is loading...')
      }
    }

    this.logger.log('Redis is ready!')
  }

  private async isReady(): Promise<boolean> {
    const info = await this.redisClient.info('persistence')
    const lines = info.split('\r\n')
    const loadingLine = lines.find(line => line.startsWith('loading:'))
    if (!loadingLine) return false
    const loadingValue = loadingLine.split(':')[1]
    return loadingValue === '0'
  }
}
