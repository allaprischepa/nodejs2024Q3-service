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

class Database {
  private static instance: Database;
  private data: Data = {
    user: [],
    artist: [],
    album: [],
  };

  user = new UserModel(this.data.user);
  artist = new ArtistModel(this.data.artist);
  album = new AlbumModel(this.data.album);

  constructor() {
    if (Database.instance) {
      return Database.instance;
    }

    Database.instance = this;
  }
}

const db = new Database();

export default db;
