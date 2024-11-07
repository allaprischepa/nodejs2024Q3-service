import { UserEntity } from 'src/user/entities/user.entity';
import { UserModel } from './models/user.model';

interface Data {
  user: UserEntity[];
}

class Database {
  private static instance: Database;
  private data: Data = {
    user: [],
  };

  user = new UserModel(this.data.user);

  constructor() {
    if (Database.instance) {
      return Database.instance;
    }

    Database.instance = this;
  }
}

const db = new Database();

export default db;
