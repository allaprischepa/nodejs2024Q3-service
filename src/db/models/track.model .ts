import { CreateTrackDto } from 'src/track/dto/create-track.dto';
import { BaseModel } from './base.model';
import { TrackEntity } from 'src/track/entities/track.entity';
import { UpdateTrackDto } from 'src/track/dto/update-track.dto';
import { OnDeleteCallback } from '..';

export class TrackModel extends BaseModel<
  CreateTrackDto,
  UpdateTrackDto,
  TrackEntity
> {
  constructor(data: TrackEntity[], onDelete: OnDeleteCallback) {
    super(data, 'track', onDelete, TrackEntity);
  }
}
