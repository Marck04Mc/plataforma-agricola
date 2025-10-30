# End-to-end testing guide

Prerequisites:
- Docker & docker-compose installed
- Ports 3001,3002,3003 free
- jq (optional) to format JSON

1) Start infra and services
```bash
./bootstrap.sh
```

2) Create an order (Orders service)
```bash
curl -sS -X POST http://localhost:3001/api/v1/orders -H "Content-Type: application/json" -d '{
  "producerId":"producer-1",
  "buyerId":"buyer-9",
  "lines":[{"productId":"prod-1","batchId":"batch-7","quantity":100,"unit":"kg","unitPrice":1200}],
  "total":{"amount":120000,"currency":"COP"}
}' | jq
```

You should receive a JSON with `orderId`.

3) Check Kafka events (locally with kafkacat or docker exec into kafka container)
Example (requires kafkacat):
```bash
kafkacat -b localhost:29092 -t OrderCreated -C -o beginning -f '%k: %s
'
```

Or use docker:
```bash
docker exec -it $(docker ps --filter ancestor=confluentinc/cp-kafka -q) bash -c "kafka-console-consumer --bootstrap-server localhost:9092 --topic OrderCreated --from-beginning --timeout-ms 10000"
```

4) Sign a contract
```bash
curl -sS -X POST http://localhost:3002/api/v1/contracts/sign -H "Content-Type: application/json" -d '{
  "contractId":"contract-1",
  "signerId":"producer-1",
  "signature":"sample-sign"
}' | jq
```

5) Reserve stock
```bash
curl -sS -X POST http://localhost:3003/api/v1/inventory/reserve -H "Content-Type: application/json" -d '{
  "productId":"prod-1",
  "quantity": 100
}' | jq
```

Notes:
- Migrations are run by bootstrap.sh; you can also run manually:
```bash
cd services/orders-service
npm run migration:run
```
