import { Module } from '@nestjs/common';
import { ArenaController } from './arena.controller';
@Module({ controllers:[ArenaController] })
export class ArenaModule {}