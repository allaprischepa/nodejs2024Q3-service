import { v4 as uuidV4 } from 'uuid';
import { CreateUserDto } from '../dto/create-user.dto';

interface User {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export class UserEntity implements User {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;
  private password: string;

  constructor(createUserDto: CreateUserDto) {
    const { login, password } = createUserDto;
    const now = Date.now();

    this.id = uuidV4();
    this.login = login;
    this.password = password;
    this.version = 1;
    this.createdAt = now;
    this.updatedAt = now;
  }
}
