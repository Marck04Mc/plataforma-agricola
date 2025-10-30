import { IsNotEmpty, IsArray, ValidateNested, IsString } from 'class-validator';
import { Type } from 'class-transformer';

class OrderLineDto {
  @IsString()
  productId: string;

  @IsString()
  batchId?: string;

  @IsNotEmpty()
  quantity: number;

  @IsString()
  unit: string;

  @IsNotEmpty()
  unitPrice: number;
}

export class CreateOrderDto {
  @IsString()
  producerId: string;

  @IsString()
  buyerId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderLineDto)
  lines: OrderLineDto[];

  total: any;
}
