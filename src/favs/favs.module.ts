import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { ArtistModule } from 'src/artist/artist.module';

@Module({
  imports: [ArtistModule],
  controllers: [FavsController],
  providers: [FavsService],
})
export class FavsModule {}
