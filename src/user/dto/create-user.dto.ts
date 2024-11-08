import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'User login', example: 'johndoe' })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({ description: 'User password', example: 'P@ssw0rd' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
