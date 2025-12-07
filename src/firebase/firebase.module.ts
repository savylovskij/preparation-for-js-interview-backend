import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { firebaseProvider } from './firebase.provider';

@Module({
  imports: [ConfigModule],
  providers: [firebaseProvider],
  exports: [firebaseProvider],
})
export class FirebaseModule {}
