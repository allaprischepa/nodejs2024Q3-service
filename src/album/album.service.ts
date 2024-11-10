import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import db from 'src/db';
import { AlbumEntity } from './entities/album.entity';
import { ArtistService } from 'src/artist/artist.service';

@Injectable()
export class AlbumService {
  async create(createAlbumDto: CreateAlbumDto) {
    const { artistId } = createAlbumDto;

    if (artistId) await ArtistService.ensureArtistExists(artistId);

    return db.album.create(createAlbumDto);
  }

  async findAll() {
    return db.album.findMany();
  }

  async findOne(id: string) {
    return AlbumService.ensureAlbumExists(id);
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const { artistId } = updateAlbumDto;

    await AlbumService.ensureAlbumExists(id);
    if (artistId) await ArtistService.ensureArtistExists(artistId);

    return db.album.update(id, updateAlbumDto);
  }

  async remove(id: string) {
    await AlbumService.ensureAlbumExists(id);

    return db.album.delete(id);
  }

  static async ensureAlbumExists(
    id: string,
    exceptionType = NotFoundException,
  ): Promise<AlbumEntity> {
    const album = await db.album.findUnique(id);

    if (!album) {
      throw new exceptionType(`Album with id: ${id} not found`);
    }

    return album;
  }
}
