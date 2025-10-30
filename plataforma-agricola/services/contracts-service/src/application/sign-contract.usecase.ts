import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { KafkaPublisher } from '../infra/messaging/kafka-publisher';

@Injectable()
export class SignContractUseCase {
  constructor(private kafka: KafkaPublisher) {}
  async execute(input: any) {
    // find contract, persist signature - omitted in scaffold
    const evt = {
      eventType: 'ContractSigned',
      eventId: uuidv4(),
      occurredAt: new Date().toISOString(),
      payload: { contractId: input.contractId, signerId: input.signerId },
      metadata: { source: 'contracts-service' }
    };
    await this.kafka.publish('ContractSigned', evt);
    return { contractId: input.contractId, status: 'Signed' };
  }
}
