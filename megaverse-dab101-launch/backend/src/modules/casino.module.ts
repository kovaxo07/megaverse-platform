import { Module } from '@nestjs/common';
import { CasinoController } from './casino.controller';
@Module({ controllers:[CasinoController] })
export class CasinoModule {}