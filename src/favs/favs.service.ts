import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { TrackService } from 'src/track/track.service';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class FavsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}
  async findOne() {
    let favorites = await this.prisma.favorites.findFirst();

    if (!favorites) {
      favorites = await this.prisma.favorites.create({
        data: { userId: uuidV4() },
      });
    }

    return favorites;
  }

  async findAll() {
    const favorites = await this.findOne();
    const artists = await this.prisma.artist.findMany({
      where: { id: { in: favorites.artists } },
    });
    const albums = await this.prisma.album.findMany({
      where: { id: { in: favorites.albums } },
    });
    const tracks = await this.prisma.track.findMany({
      where: { id: { in: favorites.tracks } },
    });

    return {
      artists,
      albums,
      tracks,
    };
  }

  async addTrack(id: string) {
    await this.trackService.ensureTrackExists(id, UnprocessableEntityException);

    const favorites = await this.findOne();

    await this.prisma.favorites.updateMany({
      where: { id: favorites.id },
      data: {
        tracks: {
          push: id,
        },
      },
    });

    return `Track with id: ${id} added to favorites`;
  }

  async removeTrack(id: string) {
    const favorites = await this.findOne();
    const existingTracks = favorites.tracks;

    if (!existingTracks.includes(id)) {
      throw new NotFoundException(`Track with id: ${id} is not in favorites`);
    }

    await this.prisma.favorites.updateMany({
      where: { id: favorites.id },
      data: {
        tracks: {
          set: existingTracks.filter((trackId) => trackId !== id),
        },
      },
    });
  }

  async addAlbum(id: string) {
    await this.albumService.ensureAlbumExists(id, UnprocessableEntityException);

    const favorites = await this.findOne();

    await this.prisma.favorites.updateMany({
      where: { id: favorites.id },
      data: {
        albums: {
          push: id,
        },
      },
    });

    return `Album with id: ${id} added to favorites`;
  }

  async removeAlbum(id: string) {
    const favorites = await this.findOne();
    const existingAlbums = favorites.albums;

    if (!existingAlbums.includes(id)) {
      throw new NotFoundException(`Album with id: ${id} is not in favorites`);
    }

    await this.prisma.favorites.updateMany({
      where: { id: favorites.id },
      data: {
        albums: {
          set: existingAlbums.filter((albumId) => albumId !== id),
        },
      },
    });
  }

  async addArtist(id: string) {
    await this.artistService.ensureArtistExists(
      id,
      UnprocessableEntityException,
    );

    const favorites = await this.findOne();

    await this.prisma.favorites.updateMany({
      where: { id: favorites.id },
      data: {
        artists: {
          push: id,
        },
      },
    });

    return `Artist with id: ${id} added to favorites`;
  }

  async removeArtist(id: string) {
    const favorites = await this.findOne();
    const existingArtists = favorites.artists;

    if (!existingArtists.includes(id)) {
      throw new NotFoundException(`Artist with id: ${id} is not in favorites`);
    }

    await this.prisma.favorites.updateMany({
      where: { id: favorites.id },
      data: {
        artists: {
          set: existingArtists.filter((artistId) => artistId !== id),
        },
      },
    });
  }
}
