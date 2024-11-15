import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import db from 'src/db';
import { ArtistEntity } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  async create(createArtistDto: CreateArtistDto) {
    return db.artist.create(createArtistDto);
  }

  async findAll() {
    return db.artist.findMany();
  }

  async findOne(id: string) {
    return ArtistService.ensureArtistExists(id);
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    await ArtistService.ensureArtistExists(id);

    return db.artist.update(id, updateArtistDto);
  }

  async remove(id: string) {
    await ArtistService.ensureArtistExists(id);

    return db.artist.delete(id);
  }

  static async ensureArtistExists(
    id: string,
    exceptionType = NotFoundException,
  ): Promise<ArtistEntity> {
    const artist = await db.artist.findUnique(id);

    if (!artist) {
      throw new exceptionType(`Artist with id: ${id} not found`);
    }

    return artist;
  }
}
