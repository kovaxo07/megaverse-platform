import { Controller, Get } from '@nestjs/common';
@Controller('mall')
export class MallController{
  @Get('stores')
  stores(){
    return [
      {id:'fashion',name:'Fashion District'},
      {id:'electronics',name:'Electronics Hall'}
    ];
  }

  // New: example catalog endpoint used by StoreTemplateA
  @Get('catalog')
  catalog(){
    return [
      { id: 'sku-hoodie', title: 'DAB Hoodie', price: 49.99 },
      { id: 'sku-hat', title: 'Neon Cap', price: 24.50 },
      { id: 'sku-sticker', title: 'Sticker Pack', price: 5.00 }
    ];
  }
}