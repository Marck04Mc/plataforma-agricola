export class Order {
  constructor(public orderId: string, public lines: any[], public total: any, public status = 'Created') {}
}
