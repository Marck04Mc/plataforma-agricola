import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KafkaPublisher } from './infra/messaging/kafka-publisher';

@Module({
  imports: [],
  controllers: [],
  providers: [KafkaPublisher],
})
export class AppModule {}
