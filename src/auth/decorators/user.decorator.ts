import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { FirebaseUser } from '../../core/models/user';

interface RequestWithUser {
  user?: FirebaseUser;
}

export const UserRequest = createParamDecorator(
  (_, ctx: ExecutionContext): FirebaseUser | null => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    if (!user) {
      return null;
    }

    return user;
  },
);
