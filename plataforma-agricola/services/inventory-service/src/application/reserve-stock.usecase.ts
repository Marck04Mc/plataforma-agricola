import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { KafkaPublisher } from '../infra/messaging/kafka-publisher';

@Injectable()
export class ReserveStockUseCase {
  constructor(private kafka: KafkaPublisher) {}
  async execute(input: any) {
    // reserve logic omitted
    const evt = { eventType: 'StockReserved', eventId: uuidv4(), occurredAt: new Date().toISOString(), payload: input };
    await this.kafka.publish('StockReserved', evt);
    return { reserved: true };
  }
}
