import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { BaseModel } from './base.model';
import { UserEntity } from 'src/user/entities/user.entity';
import { UpdatePasswordDto } from 'src/user/dto/update-password.dto';

export class UserModel extends BaseModel<CreateUserDto, UserEntity> {
  constructor(data: UserEntity[]) {
    super(data, UserEntity);
  }

  async updatePassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserEntity> {
    const user = await this.findUnique(id);
    const { newPassword } = updatePasswordDto;

    if (user) {
      user.password = newPassword;
      user.version += 1;
      user.updatedAt = Date.now();
    }

    return user;
  }
}
