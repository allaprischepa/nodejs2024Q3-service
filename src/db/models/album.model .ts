import { CreateAlbumDto } from 'src/album/dto/create-album.dto';
import { BaseModel } from './base.model';
import { AlbumEntity } from 'src/album/entities/album.entity';
import { UpdateAlbumDto } from 'src/album/dto/update-album.dto';
import { OnDeleteCallback } from '..';

export class AlbumModel extends BaseModel<
  CreateAlbumDto,
  UpdateAlbumDto,
  AlbumEntity
> {
  constructor(data: AlbumEntity[], onDelete: OnDeleteCallback) {
    super(data, 'album', onDelete, AlbumEntity);
  }
}
