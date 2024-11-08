import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateArtistDto {
  @ApiProperty({ description: 'Artist name', example: 'DJ Funky Marmalade' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Artist grammy presense', example: true })
  @IsBoolean()
  @IsNotEmpty()
  grammy: boolean;
}
