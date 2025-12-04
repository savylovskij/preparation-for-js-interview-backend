import { ApiProperty } from '@nestjs/swagger';

import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'User id',
    example: '123-123-123',
    type: String,
  })
  @IsNotEmpty()
  @IsUUID('4')
  id!: string;

  @ApiProperty({
    description: 'User name',
    example: 'User name',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  name!: string;

  @ApiProperty({
    description: 'User email',
    example: 'example@email.com',
    type: String,
  })
  @IsEmail()
  @MaxLength(50)
  email!: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @MinLength(5)
  password!: string;
}
