import { registerAs } from '@nestjs/config';

import * as Joi from 'joi';

export const dbConfig = registerAs('database', () => ({
  type: 'postgres',
  host: process.env.PGHOST,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  autoLoadEntities: true,
  synchronize: process.env.TYPEORM_SYNC === 'true',
}));

export const dbValidationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('dev', 'prod').default('dev'),
  PGHOST: Joi.string().required(),
  PGUSER: Joi.string().required(),
  PGPASSWORD: Joi.string().required(),
  PGDATABASE: Joi.string().required(),
  TYPEORM_SYNC: Joi.boolean().default(false),
});
