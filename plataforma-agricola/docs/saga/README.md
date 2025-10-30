Saga Orchestrator (example)
Flow: OrderCreated -> ReserveStock -> ScheduleShipment -> InitiatePayment
If a step fails, orchestrator emits compensating events (e.g., StockRelease, OrderCancelled)
