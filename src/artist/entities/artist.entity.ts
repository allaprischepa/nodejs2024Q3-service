import { ApiProperty } from '@nestjs/swagger';
import { Artist } from '@prisma/client';

export class ArtistEntity implements Artist {
  @ApiProperty({ example: '6476c336-c646-4c28-bbea-7390b385518a' })
  id: string;

  @ApiProperty({ example: 'DJ Funky Marmalade' })
  name: string;

  @ApiProperty({ example: true })
  grammy: boolean;
}
