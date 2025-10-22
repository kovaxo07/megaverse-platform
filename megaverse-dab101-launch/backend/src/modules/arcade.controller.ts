import { Controller, Get } from '@nestjs/common';
@Controller('arcade')
export class ArcadeController{
  @Get('games') games(){ return [{id:'runner',name:'Neon Runner'},{id:'slots-demo',name:'Slots Demo'}]; }
}