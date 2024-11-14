import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import db from 'src/db';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class FavsService {
  constructor(
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
  ) {}
  async findAll() {
    return db.favs.findMany();
  }

  async addTrack(id: string) {
    await TrackService.ensureTrackExists(id, UnprocessableEntityException);

    await db.favs.tracks.add(id);

    return `Track with id: ${id} added to favorites`;
  }

  async removeTrack(id: string) {
    if (!db.favs.tracks.exists(id)) {
      throw new NotFoundException(`Track with id: ${id} is not in favorites`);
    }

    return db.favs.tracks.delete(id);
  }

  async addAlbum(id: string) {
    await this.albumService.ensureAlbumExists(id, UnprocessableEntityException);

    await db.favs.albums.add(id);

    return `Album with id: ${id} added to favorites`;
  }

  async removeAlbum(id: string) {
    if (!db.favs.albums.exists(id)) {
      throw new NotFoundException(`Album with id: ${id} is not in favorites`);
    }

    return db.favs.albums.delete(id);
  }

  async addArtist(id: string) {
    await this.artistService.ensureArtistExists(
      id,
      UnprocessableEntityException,
    );

    await db.favs.artists.add(id);

    return `Artist with id: ${id} added to favorites`;
  }

  async removeArtist(id: string) {
    if (!db.favs.artists.exists(id)) {
      throw new NotFoundException(`Artist with id: ${id} is not in favorites`);
    }

    return db.favs.artists.delete(id);
  }
}
