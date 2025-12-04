import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dbValidationSchema } from './core/configs';
import { DbModule } from './db/db.module';
import { UserModule } from './user/user.module';

@Module({
  providers: [AppService],
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: dbValidationSchema,
    }),
    DbModule,
    UserModule,
  ],
})
export class AppModule {}
