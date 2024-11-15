import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateAlbumDto {
  @ApiProperty({ description: 'Album name', example: 'Best 2024' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Album release year', example: '2024' })
  @IsPositive()
  @IsNotEmpty()
  year: number;

  @ApiProperty({
    description: 'Album artist id',
    example: '6476c336-c646-4c28-bbea-7390b385518a',
  })
  @IsString()
  @IsUUID()
  @IsOptional()
  artistId: string | null;
}
