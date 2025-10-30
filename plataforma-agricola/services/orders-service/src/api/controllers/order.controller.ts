import { Controller, Post, Body } from '@nestjs/common';
import { CreateOrderUseCase } from '../../application/create-order.usecase';
import { CreateOrderDto } from '../../dto/create-order.dto';

@Controller('api/v1/orders')
export class OrderController {
  constructor(private create: CreateOrderUseCase) {}
  @Post()
  async create(@Body() body: CreateOrderDto) {
    return this.create.execute(body);
  }
}
