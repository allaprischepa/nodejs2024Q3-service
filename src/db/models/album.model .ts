import { CreateAlbumDto } from 'src/album/dto/create-album.dto';
import { BaseModel } from './base.model';
import { AlbumEntity } from 'src/album/entities/album.entity';
import { UpdateAlbumDto } from 'src/album/dto/update-album.dto';

export class AlbumModel extends BaseModel<
  CreateAlbumDto,
  UpdateAlbumDto,
  AlbumEntity
> {
  constructor(data: AlbumEntity[]) {
    super(data, AlbumEntity);
  }
}
