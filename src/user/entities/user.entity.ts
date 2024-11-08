import { Exclude, instanceToPlain } from 'class-transformer';
import { v4 as uuidV4 } from 'uuid';
import { CreateUserDto } from '../dto/create-user.dto';
import { hashSync, compareSync } from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';

interface User {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export class UserEntity implements User {
  @ApiProperty({ example: 'b04df18d-cfe7-4117-80bb-9f5a04d53d23' })
  id: string;

  @ApiProperty({ example: 'johndoe' })
  login: string;

  @ApiProperty({ example: '1' })
  version: number;

  @ApiProperty({ example: '1731044862' })
  createdAt: number;

  @ApiProperty({ example: '1731044862' })
  updatedAt: number;

  @Exclude()
  private _password: string;

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

  set password(newPassword: string) {
    this._password = hashSync(newPassword, 10);
  }

  validatePassword(password: string) {
    return compareSync(password, this._password);
  }

  toJSON() {
    return instanceToPlain(this);
  }
}
