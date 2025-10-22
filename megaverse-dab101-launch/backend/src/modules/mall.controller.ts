import { Controller, Get } from '@nestjs/common';
@Controller('mall')
export class MallController{
  @Get('stores') stores(){ return [{id:'fashion',name:'Fashion District'},{id:'electronics',name:'Electronics Hall'}]; }
}