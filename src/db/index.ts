import { UserEntity } from 'src/user/entities/user.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { ArtistModel } from './models/artist.model ';
import { AlbumEntity } from 'src/album/entities/album.entity';
import { AlbumModel } from './models/album.model ';
import { TrackEntity } from 'src/track/entities/track.entity';
import { TrackModel } from './models/track.model ';
import { FavsEntity } from 'src/favs/entities/favs.entity';
import { FavsModel } from './models/favs.model ';

interface Data {
  user: UserEntity[];
  artist: ArtistEntity[];
  album: AlbumEntity[];
  track: TrackEntity[];
  favs: FavsEntity;
}

export interface OnDeleteCallback {
  (id: string, field: string): void;
}

export class Database {
  private static instance: Database;
  private data: Data = {
    user: [],
    artist: [],
    album: [],
    track: [],
    favs: new FavsEntity(),
  };

  private onDelete = (id: string, type: string) => {
    const field = `${type}Id`;
    const favKey = `${type}s`;

    Object.keys(this.data).forEach((key) => {
      if (key === type) return;

      if (this.data[key] instanceof FavsEntity && this.data[key][favKey]) {
        const index = this.data[key][favKey].findIndex(
          (entityId: string) => entityId === id,
        );

        this.data[key][favKey].splice(index, 1);
      } else if (Array.isArray(this.data[key])) {
        this.data[key].forEach((e) => {
          if (e[field] && e[field] === id) e[field] = null;
        });
      }
    });
  };

  artist = new ArtistModel(this.data.artist, this.onDelete);
  album = new AlbumModel(this.data.album, this.onDelete);
  track = new TrackModel(this.data.track, this.onDelete);
  favs = new FavsModel(this.data.favs);

  constructor() {
    if (Database.instance) {
      return Database.instance;
    }

    Database.instance = this;
  }
}

const db = new Database();

export default db;
