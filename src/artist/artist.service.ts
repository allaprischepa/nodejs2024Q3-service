import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArtistService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createArtistDto: CreateArtistDto) {
    return this.prisma.artist.create({ data: createArtistDto });
  }

  async findAll() {
    return this.prisma.artist.findMany();
  }

  async findOne(id: string) {
    return this.ensureArtistExists(id);
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    await this.ensureArtistExists(id);

    return this.prisma.artist.update({
      where: { id },
      data: updateArtistDto,
    });
  }

  async remove(id: string) {
    await this.ensureArtistExists(id);

    return this.prisma.artist.delete({ where: { id } });
  }

  async ensureArtistExists(
    id: string,
    exceptionType = NotFoundException,
  ): Promise<ArtistEntity> {
    const artist = await this.prisma.artist.findUnique({ where: { id } });

    if (!artist) {
      throw new exceptionType(`Artist with id: ${id} not found`);
    }

    return artist;
  }
}
