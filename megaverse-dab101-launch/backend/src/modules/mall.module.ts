import { Module } from '@nestjs/common';
import { MallController } from './mall.controller';
@Module({ controllers:[MallController] })
export class MallModule {}