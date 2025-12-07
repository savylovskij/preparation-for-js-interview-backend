import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { dbValidationSchema } from './core/configs';
import { DbModule } from './db/db.module';
import { UserModule } from './user/user.module';

@Module({
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: dbValidationSchema,
    }),
    DbModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
