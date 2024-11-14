import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class UserEntity implements Omit<User, 'createdAt' | 'updatedAt'> {
  @ApiProperty({ example: 'b04df18d-cfe7-4117-80bb-9f5a04d53d23' })
  id: string;

  @ApiProperty({ example: 'johndoe' })
  login: string;

  @ApiProperty({ example: 1 })
  version: number;

  @ApiProperty({ example: 1731044862 })
  createdAt: number;

  @ApiProperty({ example: 1731044862 })
  updatedAt: number;

  @Exclude()
  password: string;
}
