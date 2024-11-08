import { ApiProperty } from '@nestjs/swagger';
import { CreateTrackDto } from '../dto/create-track.dto';
import { v4 as uuidV4 } from 'uuid';

interface Track {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

export class TrackEntity implements Track {
  @ApiProperty({ example: 'a0030c1c-6e2a-45fe-9653-6a8be16be998' })
  id: string;

  @ApiProperty({ example: 'Midnight Voyage' })
  name: string;

  @ApiProperty({ example: '6476c336-c646-4c28-bbea-7390b385518a' })
  artistId: string | null;

  @ApiProperty({ example: '7429cef1-0a5d-4fdd-9df4-2443d486d34a' })
  albumId: string | null;

  @ApiProperty({ example: '205' })
  duration: number;

  constructor(createTrackDto: CreateTrackDto) {
    const { name, artistId, albumId, duration } = createTrackDto;

    this.id = uuidV4();
    this.name = name;
    this.artistId = artistId;
    this.albumId = albumId;
    this.duration = duration;
  }
}
