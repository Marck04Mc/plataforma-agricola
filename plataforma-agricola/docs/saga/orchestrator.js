// Pseudo-code for a simple saga orchestrator consuming OrderCreated events
// and orchestrating subsequent steps by publishing commands/events.
const { Kafka } = require('kafkajs');
const kafka = new Kafka({ clientId: 'saga-orch', brokers: [process.env.KAFKA_BROKER || 'kafka:9092']});
(async ()=> {
  const consumer = kafka.consumer({ groupId: 'saga-orch-group' });
  const producer = kafka.producer();
  await consumer.connect(); await producer.connect();
  await consumer.subscribe({ topic: 'OrderCreated', fromBeginning: true });
  await consumer.run({ eachMessage: async ({ message }) => {
    const evt = JSON.parse(message.value.toString());
    console.log('Orchestrator received', evt.eventType);
    // 1) send ReserveStock command (topic: ReserveStockCommand)
    await producer.send({ topic: 'ReserveStockCommand', messages: [{ key: evt.payload.orderId, value: JSON.stringify({ orderId: evt.payload.orderId }) }]});
    // then wait for events or implement timeouts/compensations...
  }});
})();
