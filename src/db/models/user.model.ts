import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { BaseModel } from './base.model';
import { UserEntity } from 'src/user/entities/user.entity';

export class UserModel extends BaseModel<CreateUserDto, UserEntity> {
  constructor(data: UserEntity[]) {
    super(data, UserEntity);
  }
}
