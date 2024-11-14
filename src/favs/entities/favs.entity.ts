import { ApiProperty } from '@nestjs/swagger';
import { CreateFavsDto } from '../dto/create-favs.dto';
import db from 'src/db';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { AlbumEntity } from 'src/album/entities/album.entity';
import { TrackEntity } from 'src/track/entities/track.entity';

interface Favorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}

export class FavsEntity implements Favorites {
  @ApiProperty({ type: [ArtistEntity] })
  artists: string[];

  @ApiProperty({ type: [AlbumEntity] })
  albums: string[];

  @ApiProperty({ type: [TrackEntity] })
  tracks: string[];
}
