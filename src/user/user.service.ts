import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { login } = createUserDto;
    const existingUser = await this.prisma.extended.user.findUnique({
      where: { login },
    });

    if (existingUser) {
      throw new ConflictException(`User with login: ${login} already exists`);
    }

    return this.prisma.extended.user.create({
      data: createUserDto,
      omit: { password: true },
    });
  }

  async findAll() {
    return this.prisma.extended.user.findMany({ omit: { password: true } });
  }

  async findOne(id: string) {
    return this.ensureUserExists(id, { omit: { password: true } });
  }

  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const { oldPassword, newPassword } = updatePasswordDto;
    const user = await this.ensureUserExists(id);

    if (
      !this.prisma.extended.user.validatePassword(oldPassword, user.password)
    ) {
      throw new ForbiddenException('The old password is incorrect');
    }

    const updatedUser = await this.prisma.extended.user.update({
      where: { id },
      data: { password: newPassword },
      omit: { password: true },
    });

    return updatedUser;
  }

  async remove(id: string) {
    await this.ensureUserExists(id);

    return this.prisma.extended.user.delete({ where: { id } });
  }

  private async ensureUserExists(id: string, options?: object) {
    const user = await this.prisma.extended.user.findUnique({
      where: { id },
      ...options,
    });

    if (!user) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }

    return user;
  }
}
