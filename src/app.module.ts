import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { RedisService } from './redis'
@Module({
  controllers: [AppController],
  providers: [RedisService],
})
export class AppModule {}
