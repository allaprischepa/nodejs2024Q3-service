import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ArtistService } from 'src/artist/artist.service';
import { AlbumService } from 'src/album/album.service';
import db from 'src/db';
import { TrackEntity } from './entities/track.entity';

@Injectable()
export class TrackService {
  async create(createTrackDto: CreateTrackDto) {
    const { artistId, albumId } = createTrackDto;

    if (artistId) await ArtistService.ensureArtistExists(artistId);
    if (albumId) await AlbumService.ensureAlbumExists(albumId);

    return db.track.create(createTrackDto);
  }

  async findAll() {
    return db.track.findMany();
  }

  async findOne(id: string) {
    return TrackService.ensureTrackExists(id);
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const { artistId, albumId } = updateTrackDto;

    await TrackService.ensureTrackExists(id);
    if (artistId) await ArtistService.ensureArtistExists(artistId);
    if (albumId) await AlbumService.ensureAlbumExists(albumId);

    return db.track.update(id, updateTrackDto);
  }

  async remove(id: string) {
    await TrackService.ensureTrackExists(id);

    return db.track.delete(id);
  }

  static async ensureTrackExists(id: string): Promise<TrackEntity> {
    const track = await db.track.findUnique(id);

    if (!track) {
      throw new NotFoundException(`Track with id: ${id} not found`);
    }

    return track;
  }
}
