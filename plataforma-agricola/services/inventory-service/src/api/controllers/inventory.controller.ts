import { Controller, Get, Post, Body } from '@nestjs/common';
import { ReserveStockUseCase } from '../../application/reserve-stock.usecase';
import { ReserveStockDto } from '../../dto/reserve-stock.dto';

@Controller('api/v1/inventory')
export class InventoryController {
  constructor(private reserve: ReserveStockUseCase) {}
  @Get('/')
  async list() {
    return [{ productId: 'prod-1', stock: 1000 }];
  }
  @Post('/reserve')
  async reserve(@Body() body: ReserveStockDto) {
    return this.reserve.execute(body);
  }
}
