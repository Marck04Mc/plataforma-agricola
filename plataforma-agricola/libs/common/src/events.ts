export interface DomainEvent<T = any> {
  eventType: string;
  eventId: string;
  occurredAt: string;
  payload: T;
  metadata?: Record<string, any>;
}
