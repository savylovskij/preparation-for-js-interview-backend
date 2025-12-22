import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import {
  ThrottlerGuard,
  ThrottlerModule,
  ThrottlerModuleOptions,
} from '@nestjs/throttler';

import throttlerConfig from './throttler.config';

@Module({
  imports: [
    ConfigModule.forFeature(throttlerConfig),
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        config.get<ThrottlerModuleOptions>('throttler')!,
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class ThrottlerConfigModule {}
