import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const existingUser = await this.findById(createUserDto.id);

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    return this.userRepository.save(createUserDto);
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async update(id: string, updateDto: UpdateUserDto): Promise<UserEntity> {
    const currentUser = await this.findById(id);
    const newUser = Object.assign(currentUser, updateDto);

    return await this.userRepository.save(newUser);
  }

  async remove(id: string): Promise<UserEntity> {
    const currentUser = await this.findById(id);

    await this.userRepository.delete(currentUser.id);

    return currentUser;
  }
}
