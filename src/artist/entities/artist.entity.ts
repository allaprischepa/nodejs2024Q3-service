import { ApiProperty } from '@nestjs/swagger';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { v4 as uuidV4 } from 'uuid';

interface Artist {
  id: string;
  name: string;
  grammy: boolean;
}

export class ArtistEntity implements Artist {
  @ApiProperty({ example: '6476c336-c646-4c28-bbea-7390b385518a' })
  id: string;

  @ApiProperty({ example: 'DJ Funky Marmalade' })
  name: string;

  @ApiProperty({ example: true })
  grammy: boolean;

  constructor(createArtistDto: CreateArtistDto) {
    const { name, grammy } = createArtistDto;

    this.id = uuidV4();
    this.name = name;
    this.grammy = grammy;
  }
}
