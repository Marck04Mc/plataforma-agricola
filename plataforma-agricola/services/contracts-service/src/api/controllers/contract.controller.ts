import { Controller, Post, Body } from '@nestjs/common';
import { SignContractUseCase } from '../../application/sign-contract.usecase';
import { SignContractDto } from '../../dto/sign-contract.dto';

@Controller('api/v1/contracts')
export class ContractController {
  constructor(private sign: SignContractUseCase) {}
  @Post('sign')
  async sign(@Body() body: SignContractDto) {
    return this.sign.execute(body);
  }
}
