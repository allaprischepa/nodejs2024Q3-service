import { CreateArtistDto } from 'src/artist/dto/create-artist.dto';
import { BaseModel } from './base.model';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { UpdateArtistDto } from 'src/artist/dto/update-artist.dto';
import { OnDeleteCallback } from '..';

export class ArtistModel extends BaseModel<
  CreateArtistDto,
  UpdateArtistDto,
  ArtistEntity
> {
  constructor(data: ArtistEntity[], onDelete: OnDeleteCallback) {
    super(data, 'artist', onDelete, ArtistEntity);
  }
}
