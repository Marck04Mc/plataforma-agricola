import { IsString, IsNotEmpty } from 'class-validator';
export class ReserveStockDto {
  @IsString()
  productId: string;

  @IsNotEmpty()
  quantity: number;
}
