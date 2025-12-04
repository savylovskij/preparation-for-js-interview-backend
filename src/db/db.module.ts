import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import dbConfig from './db.config';

@Module({
  imports: [TypeOrmModule.forRootAsync(dbConfig.asProvider())],
})
export class DbModule {}
