import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';

import type { FirebaseUser } from '../core/models/user';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(userRequest: FirebaseUser): Promise<UserDto> {
    const existingUser = await this.userRepository.findOne({
      where: {
        firebaseId: userRequest.firebaseId,
      },
    });

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const saved = await this.userRepository.save({ ...userRequest });

    return plainToInstance(UserDto, saved, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(): Promise<UserDto[]> {
    const users = await this.userRepository.find();

    return plainToInstance(UserDto, users, {
      excludeExtraneousValues: true,
    });
  }

  async findByFirebaseId(firebaseId: string): Promise<UserDto> {
    const user = await this.userRepository.findOne({
      where: {
        firebaseId,
      },
    });

    if (!user) {
      throw new NotFoundException(
        `User with firebaseId ${firebaseId} not found`,
      );
    }

    return plainToInstance(UserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async findById(id: string): Promise<UserDto> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return plainToInstance(UserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, updateDto: UpdateUserDto): Promise<UserDto> {
    const currentUser = await this.findById(id);
    const newUser = Object.assign(currentUser, updateDto);

    const saved = await this.userRepository.save(newUser);

    return plainToInstance(UserDto, saved, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<UserDto> {
    const currentUser = await this.findById(id);

    await this.userRepository.delete(currentUser.id);

    return plainToInstance(UserDto, currentUser, {
      excludeExtraneousValues: true,
    });
  }
}
