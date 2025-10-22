import { Module } from '@nestjs/common';
import { AuthModule } from './auth.module';
import { MallModule } from './mall.module';
import { ArenaModule } from './arena.module';
import { ArcadeModule } from './arcade.module';
import { CasinoModule } from './casino.module';
import { WalletModule } from './wallet.module';

@Module({
  imports: [AuthModule, MallModule, ArenaModule, ArcadeModule, CasinoModule, WalletModule],
})
export class AppModule {}