import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import type { Request } from 'express';
import type { App } from 'firebase-admin/app';
import { DecodedIdToken, getAuth } from 'firebase-admin/auth';

import { FirebaseUser } from '../../core/models/user';
import { FIREBASE_APP } from '../../firebase/firebase.provider';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

interface RequestWithUser extends Request {
  user?: FirebaseUser;
}

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(
    @Inject(FIREBASE_APP) private readonly firebaseApp: App,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const rawUser = await getAuth(this.firebaseApp).verifyIdToken(token);

      request.user = this.handlerUser(rawUser);

      return true;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private extractToken(request: RequestWithUser): string | null {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : null;
  }

  private handlerUser(user: DecodedIdToken): FirebaseUser {
    const [firstName, lastName] = (
      user as unknown as { name: string }
    ).name.split(' ');

    return {
      firebaseId: user.uid,
      firstName,
      lastName,
      avatar: user.picture ?? null,
      email: user.email ?? null,
      provider: user.firebase.sign_in_provider,
    };
  }
}
