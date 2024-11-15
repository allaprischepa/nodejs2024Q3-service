import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTrackDto {
  @ApiProperty({ description: 'Track name', example: 'Midnight Voyage' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Track artist id',
    example: '6476c336-c646-4c28-bbea-7390b385518a',
  })
  @IsString()
  @IsUUID()
  @IsOptional()
  artistId: string | null;

  @ApiProperty({
    description: 'Track album id',
    example: '7429cef1-0a5d-4fdd-9df4-2443d486d34a',
  })
  @IsString()
  @IsUUID()
  @IsOptional()
  albumId: string | null;

  @ApiProperty({ description: 'Track duration', example: '205' })
  @IsPositive()
  @IsNotEmpty()
  duration: number;
}
