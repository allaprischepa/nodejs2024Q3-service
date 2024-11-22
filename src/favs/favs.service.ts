import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class FavsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}
  async findOne(userId: string) {
    let favorites = await this.prisma.favorites.findFirst({
      where: { userId },
    });

    if (!favorites) {
      favorites = await this.prisma.favorites.create({
        data: { userId },
      });
    }

    const extendedFavorites = await this.prisma.favorites.findUnique({
      where: { id: favorites.id },
      select: {
        id: true,
        artists: true,
        albums: true,
        tracks: true,
      },
    });

    return extendedFavorites;
  }

  async findAll(userId: string) {
    const favorites = await this.findOne(userId);

    return {
      artists: favorites.artists,
      albums: favorites.albums,
      tracks: favorites.tracks,
    };
  }

  async addTrack(id: string, userId: string) {
    const track = await this.trackService.ensureTrackExists(
      id,
      UnprocessableEntityException,
    );

    const favorites = await this.findOne(userId);

    await this.prisma.favorites.update({
      where: { id: favorites.id },
      data: {
        tracks: {
          connect: { id },
        },
      },
    });

    return `Track with id: ${id} added to favorites`;
  }

  async removeTrack(id: string, userId: string) {
    const favorites = await this.findOne(userId);
    const existingTracks = favorites.tracks;
    const trackToRemove = favorites.tracks.find((track) => track.id === id);

    if (!trackToRemove) {
      throw new NotFoundException(`Track with id: ${id} is not in favorites`);
    }

    await this.prisma.favorites.update({
      where: { id: favorites.id },
      data: {
        tracks: {
          disconnect: { id },
        },
      },
    });
  }

  async addAlbum(id: string, userId: string) {
    await this.albumService.ensureAlbumExists(id, UnprocessableEntityException);

    const favorites = await this.findOne(userId);

    await this.prisma.favorites.update({
      where: { id: favorites.id },
      data: {
        albums: {
          connect: { id },
        },
      },
    });

    return `Album with id: ${id} added to favorites`;
  }

  async removeAlbum(id: string, userId: string) {
    const favorites = await this.findOne(userId);
    const existingAlbums = favorites.albums;

    if (!existingAlbums.some((album) => album.id === id)) {
      throw new NotFoundException(`Album with id: ${id} is not in favorites`);
    }

    await this.prisma.favorites.update({
      where: { id: favorites.id },
      data: {
        albums: {
          disconnect: { id },
        },
      },
    });
  }

  async addArtist(id: string, userId: string) {
    await this.artistService.ensureArtistExists(
      id,
      UnprocessableEntityException,
    );

    const favorites = await this.findOne(userId);

    await this.prisma.favorites.update({
      where: { id: favorites.id },
      data: {
        artists: {
          connect: { id },
        },
      },
    });

    return `Artist with id: ${id} added to favorites`;
  }

  async removeArtist(id: string, userId: string) {
    const favorites = await this.findOne(userId);
    const existingArtists = favorites.artists;

    if (!existingArtists.some((artist) => artist.id === id)) {
      throw new NotFoundException(`Artist with id: ${id} is not in favorites`);
    }

    await this.prisma.favorites.update({
      where: { id: favorites.id },
      data: {
        artists: {
          disconnect: { id },
        },
      },
    });
  }
}
