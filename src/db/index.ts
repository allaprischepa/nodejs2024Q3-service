import { UserEntity } from 'src/user/entities/user.entity';
import { UserModel } from './models/user.model';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { ArtistModel } from './models/artist.model ';
import { AlbumEntity } from 'src/album/entities/album.entity';
import { AlbumModel } from './models/album.model ';

interface Data {
  user: UserEntity[];
  artist: ArtistEntity[];
  album: AlbumEntity[];
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
  };

  private onDelete = (id: string, type: string) => {
    const field = `${type}Id`;

    Object.keys(this.data).forEach((key) => {
      if (key === type) return;

      this.data[key].forEach((e) => {
        if (e[field] && e[field] === id) e[field] = null;
      });
    });
  };

  user = new UserModel(this.data.user, this.onDelete);
  artist = new ArtistModel(this.data.artist, this.onDelete);
  album = new AlbumModel(this.data.album, this.onDelete);

  constructor() {
    if (Database.instance) {
      return Database.instance;
    }

    Database.instance = this;
  }
}

const db = new Database();

export default db;
