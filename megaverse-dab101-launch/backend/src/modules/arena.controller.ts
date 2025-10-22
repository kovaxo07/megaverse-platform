import { Controller, Get } from '@nestjs/common';
@Controller('arena')
export class ArenaController{
  @Get('matchmaking') mm(){ return { status:'ok', queue:0, sports:['baseball','basketball','tennis','golf','boxing','volleyball'] }; }
}