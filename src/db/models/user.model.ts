import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { BaseModel } from './base.model';
import { UserEntity } from 'src/user/entities/user.entity';
import { UpdatePasswordDto } from 'src/user/dto/update-password.dto';
import { OnDeleteCallback } from '..';

export class UserModel extends BaseModel<
  CreateUserDto,
  UpdatePasswordDto,
  UserEntity
> {
  constructor(data: UserEntity[], onDelete: OnDeleteCallback) {
    super(data, 'user', onDelete, UserEntity);
  }

  async update(id: string, dto: UpdatePasswordDto): Promise<UserEntity> {
    return this.updatePassword(id, dto);
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
