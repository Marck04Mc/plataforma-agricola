import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { KafkaPublisher } from '../infra/messaging/kafka-publisher';

@Injectable()
export class CreateOrderUseCase {
  constructor(private kafka: KafkaPublisher) {}
  async execute(input: any) {
    const orderId = uuidv4();
    // persist logic omitted in scaffold - add repository integration here
    const event = {
      eventType: 'OrderCreated',
      eventId: uuidv4(),
      occurredAt: new Date().toISOString(),
      payload: { orderId, ...input },
      metadata: { source: 'orders-service' }
    };
    await this.kafka.publish('OrderCreated', event);
    return { orderId, status: 'Created' };
  }
}
