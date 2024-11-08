import { UserEntity } from 'src/user/entities/user.entity';
import { UserModel } from './models/user.model';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { ArtistModel } from './models/artist.model ';

interface Data {
  user: UserEntity[];
  artist: ArtistEntity[];
}

class Database {
  private static instance: Database;
  private data: Data = {
    user: [],
    artist: [],
  };

  user = new UserModel(this.data.user);
  artist = new ArtistModel(this.data.artist);

  constructor() {
    if (Database.instance) {
      return Database.instance;
    }

    Database.instance = this;
  }
}

const db = new Database();

export default db;
