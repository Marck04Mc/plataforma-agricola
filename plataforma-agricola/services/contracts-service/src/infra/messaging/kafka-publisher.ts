import { Injectable } from '@nestjs/common';
import { Kafka, logLevel } from 'kafkajs';
import { DomainEvent } from '@plataforma/common/src/events';

@Injectable()
export class KafkaPublisher {
  private kafka: Kafka;
  private producer: any;

  constructor() {
    const brokers = [process.env.KAFKA_BROKER || 'kafka:9092'];
    this.kafka = new Kafka({ clientId: process.env.KAFKA_CLIENT_ID || 'plataforma-client', brokers, logLevel: logLevel.ERROR });
    this.producer = this.kafka.producer();
    this.connect();
  }

  async connect() {
    try { await this.producer.connect(); } catch(e){ console.warn('kafka connect warn', e.message); }
  }

  async publish(topic: string, event: DomainEvent) {
    await this.producer.send({ topic, messages: [{ key: event.eventId, value: JSON.stringify(event) }] });
  }
}
