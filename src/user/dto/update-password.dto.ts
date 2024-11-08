import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({ description: 'Old user password', example: 'P@ssw0rd' })
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({ description: 'New user password', example: 'P@ssw0rdQwerty' })
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
