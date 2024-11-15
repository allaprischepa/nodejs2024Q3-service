import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsUUID } from 'class-validator';

export class CreateFavsDto {
  @ApiProperty({
    description: 'Array of artists ids',
    example: ['6476c336-c646-4c28-bbea-7390b385518a'],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID(4, { each: true })
  artists: string[];

  @ApiProperty({
    description: 'Array of albums ids',
    example: ['7429cef1-0a5d-4fdd-9df4-2443d486d34a'],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID(4, { each: true })
  albums: string[];

  @ApiProperty({
    description: 'Array of tracks ids',
    example: ['a0030c1c-6e2a-45fe-9653-6a8be16be998'],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID(4, { each: true })
  tracks: string[];
}
