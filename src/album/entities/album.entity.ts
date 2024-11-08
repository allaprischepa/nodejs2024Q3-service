import { ApiProperty } from '@nestjs/swagger';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { v4 as uuidV4 } from 'uuid';

interface Album {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}

export class AlbumEntity implements Album {
  @ApiProperty({ example: '7429cef1-0a5d-4fdd-9df4-2443d486d34a' })
  id: string;

  @ApiProperty({ example: 'Best 2024' })
  name: string;

  @ApiProperty({ example: '2024' })
  year: number;

  @ApiProperty({ example: '6476c336-c646-4c28-bbea-7390b385518a' })
  artistId: string | null;

  constructor(createAlbumDto: CreateAlbumDto) {
    const { name, year, artistId } = createAlbumDto;

    this.id = uuidV4();
    this.name = name;
    this.year = year;
    this.artistId = artistId;
  }
}
