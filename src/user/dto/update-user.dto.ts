import { ApiProperty } from '@nestjs/swagger';

import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: 'First Name',
    example: 'John',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  firstName!: string;

  @ApiProperty({
    description: 'Last Name',
    example: 'Doe',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  lastName!: string;

  @ApiProperty({
    description: 'Avatar URL',
    required: false,
    example: 'https://example.com/avatar.jpg',
  })
  @IsOptional()
  @IsString()
  @IsUrl()
  avatar?: string;

  @ApiProperty({
    description: 'User email',
    example: 'example@email.com',
  })
  @IsEmail()
  @MaxLength(50)
  @IsOptional()
  email?: string;
}
