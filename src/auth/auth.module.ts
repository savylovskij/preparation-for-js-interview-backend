import { Module } from '@nestjs/common';

import { FirebaseModule } from '../firebase/firebase.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { FirebaseAuthGuard } from './guards/firebase-auth.guard';

@Module({
  imports: [FirebaseModule, UserModule],
  controllers: [AuthController],
  providers: [FirebaseAuthGuard],
})
export class AuthModule {}
