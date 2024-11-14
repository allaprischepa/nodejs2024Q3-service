import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { ArtistModule } from 'src/artist/artist.module';

@Module({
  imports: [ArtistModule],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
