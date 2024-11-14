import { ApiProperty } from '@nestjs/swagger';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { AlbumEntity } from 'src/album/entities/album.entity';
import { TrackEntity } from 'src/track/entities/track.entity';
import { Favorites } from '@prisma/client';

export class FavsEntity implements Omit<Favorites, 'id' | 'userId'> {
  @ApiProperty({ type: [ArtistEntity] })
  artists: string[];

  @ApiProperty({ type: [AlbumEntity] })
  albums: string[];

  @ApiProperty({ type: [TrackEntity] })
  tracks: string[];
}
