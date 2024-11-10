import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import db from 'src/db';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  async create(createUserDto: CreateUserDto) {
    const { login } = createUserDto;
    const existingUser = await db.user.findUnique({ where: { login } });

    if (existingUser) {
      throw new ConflictException(`User with login: ${login} already exists`);
    }

    return db.user.create(createUserDto);
  }

  async findAll() {
    return db.user.findMany();
  }

  async findOne(id: string) {
    return this.ensureUserExists(id);
  }

  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const { oldPassword } = updatePasswordDto;
    const user = await this.ensureUserExists(id);

    if (!user.validatePassword(oldPassword)) {
      throw new ForbiddenException('The old password is incorrect');
    }

    const updatedUser = await db.user.updatePassword(id, updatePasswordDto);

    return updatedUser;
  }

  async remove(id: string) {
    await this.ensureUserExists(id);

    return db.user.delete(id);
  }

  private async ensureUserExists(id: string): Promise<UserEntity> {
    const user = await db.user.findUnique(id);

    if (!user) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }

    return user;
  }
}
