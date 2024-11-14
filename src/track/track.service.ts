import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ArtistService } from 'src/artist/artist.service';
import { AlbumService } from 'src/album/album.service';
import { TrackEntity } from './entities/track.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrackService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    const { artistId, albumId } = createTrackDto;

    if (artistId) await this.artistService.ensureArtistExists(artistId);
    if (albumId) await this.albumService.ensureAlbumExists(albumId);

    return this.prisma.track.create({ data: createTrackDto });
  }

  async findAll() {
    return this.prisma.track.findMany();
  }

  async findOne(id: string) {
    return this.ensureTrackExists(id);
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const { artistId, albumId } = updateTrackDto;

    await this.ensureTrackExists(id);
    if (artistId) await this.artistService.ensureArtistExists(artistId);
    if (albumId) await this.albumService.ensureAlbumExists(albumId);

    return this.prisma.track.update({ where: { id }, data: updateTrackDto });
  }

  async remove(id: string) {
    await this.ensureTrackExists(id);

    return this.prisma.track.delete({ where: { id } });
  }

  async ensureTrackExists(
    id: string,
    exceptionType = NotFoundException,
  ): Promise<TrackEntity> {
    const track = await this.prisma.track.findUnique({ where: { id } });

    if (!track) {
      throw new exceptionType(`Track with id: ${id} not found`);
    }

    return track;
  }
}
