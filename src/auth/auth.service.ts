import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signUp(authDto: AuthDto) {
    return this.userService.create(authDto);
  }

  async signIn(authDto: AuthDto) {
    const { login, password } = authDto;
    const frbddnMsg = 'Login or password is incorrect';

    const user = await this.userService.ensureUserExistsByLogin(
      login,
      ForbiddenException,
      frbddnMsg,
    );

    if (!this.userService.validatePassword(password, user)) {
      throw new ForbiddenException(frbddnMsg);
    }
  }
}
