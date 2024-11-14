import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumEntity } from './entities/album.entity';
import { ArtistService } from 'src/artist/artist.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly artistService: ArtistService,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const { artistId } = createAlbumDto;

    if (artistId) await this.artistService.ensureArtistExists(artistId);

    return this.prisma.album.create({ data: createAlbumDto });
  }

  async findAll() {
    return this.prisma.album.findMany();
  }

  async findOne(id: string) {
    return this.ensureAlbumExists(id);
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const { artistId } = updateAlbumDto;

    await this.ensureAlbumExists(id);
    if (artistId) await this.artistService.ensureArtistExists(artistId);

    return this.prisma.album.update({ where: { id }, data: updateAlbumDto });
  }

  async remove(id: string) {
    await this.ensureAlbumExists(id);

    return this.prisma.album.delete({ where: { id } });
  }

  async ensureAlbumExists(
    id: string,
    exceptionType = NotFoundException,
  ): Promise<AlbumEntity> {
    const album = await this.prisma.album.findUnique({ where: { id } });

    if (!album) {
      throw new exceptionType(`Album with id: ${id} not found`);
    }

    return album;
  }
}
