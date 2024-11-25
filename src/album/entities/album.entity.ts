import { ApiProperty } from '@nestjs/swagger';
import { Album } from '@prisma/client';

export class AlbumEntity implements Album {
  @ApiProperty({ example: '7429cef1-0a5d-4fdd-9df4-2443d486d34a' })
  id: string;

  @ApiProperty({ example: 'Best 2024' })
  name: string;

  @ApiProperty({ example: 2024 })
  year: number;

  @ApiProperty({ example: '6476c336-c646-4c28-bbea-7390b385518a' })
  artistId: string | null;
}
