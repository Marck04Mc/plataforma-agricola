import { IsString } from 'class-validator';
export class SignContractDto {
  @IsString()
  contractId: string;

  @IsString()
  signerId: string;

  @IsString()
  signature: string;
}
