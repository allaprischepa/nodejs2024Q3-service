import { ApiProperty } from '@nestjs/swagger';
import { Track } from '@prisma/client';

export class TrackEntity implements Track {
  @ApiProperty({ example: 'a0030c1c-6e2a-45fe-9653-6a8be16be998' })
  id: string;

  @ApiProperty({ example: 'Midnight Voyage' })
  name: string;

  @ApiProperty({ example: '6476c336-c646-4c28-bbea-7390b385518a' })
  artistId: string | null;

  @ApiProperty({ example: '7429cef1-0a5d-4fdd-9df4-2443d486d34a' })
  albumId: string | null;

  @ApiProperty({ example: 205 })
  duration: number;
}
