import 'dotenv/config'

export const REDIS_HOST = process.env.REDIS_HOST ?? 'localhost'
export const REDIS_PORT = Number(process.env.REDIS_PORT ?? 6379)

export const YETI_PREFIX = process.env.YETI_PREFIX ?? 'YETI:sighting'
export const YETI_STREAM = process.env.YETI_STREAM ?? `${YETI_PREFIX}:reported`
export const YETI_GROUP = process.env.YETI_GROUP ?? `${YETI_PREFIX}:group`

export const EVENT_IDLE_TIME = 600000
export const STREAM_WAIT_TIME = 5000
