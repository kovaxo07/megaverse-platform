import { Controller, Get } from '@nestjs/common';
@Controller('wallet')
export class WalletController{
  @Get('balance') balance(){ return { address:'0x...', dab:'0.0' }; }
}