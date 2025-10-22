import { Module } from '@nestjs/common';
import { ArcadeController } from './arcade.controller';
@Module({ controllers:[ArcadeController] })
export class ArcadeModule {}