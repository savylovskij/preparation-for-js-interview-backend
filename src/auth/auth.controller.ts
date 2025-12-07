import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { type FirebaseUser } from '../core/models/user';
import { UserDto } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';
import { UserRequest } from './decorators/user.decorator';
import { FirebaseAuthGuard } from './guards/firebase-auth.guard';

@ApiTags('Auth')
@ApiBearerAuth()
@UseGuards(FirebaseAuthGuard)
@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User successfully created.' })
  @ApiResponse({ status: 409, description: 'User already exists.' })
  async register(@UserRequest() userRequest: FirebaseUser): Promise<UserDto> {
    return this.userService.create(userRequest);
  }

  @Get('me')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, description: 'Return user profile.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async getCurrentUser(
    @UserRequest() userRequest: FirebaseUser,
  ): Promise<UserDto> {
    return await this.userService.findByFirebaseId(userRequest.firebaseId);
  }
}
