import { Controller, Get } from '@nestjs/common';
@Controller('casino')
export class CasinoController{
  @Get('status') status(){ return { enabled: false, note: 'Enable after licensing, geofencing & KYC configuration.' }; }
}