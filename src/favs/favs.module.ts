import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { ArtistModule } from 'src/artist/artist.module';
import { AlbumModule } from 'src/album/album.module';

@Module({
  imports: [ArtistModule, AlbumModule],
  controllers: [FavsController],
  providers: [FavsService],
})
export class FavsModule {}
