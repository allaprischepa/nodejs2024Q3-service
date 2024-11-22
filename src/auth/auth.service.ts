import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { jwtSettings } from './auth.settings';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  private frbddnMsg = 'Login or password is incorrect';
  private readonly refreshTokenOptions = {
    secret: jwtSettings.refresh_secret_key,
    expiresIn: jwtSettings.refresh_expire_time,
  };

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private async getTokens(user: UserEntity) {
    const payload = {
      userId: user.id,
      login: user.login,
    };
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(
      payload,
      this.refreshTokenOptions,
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async signUp(authDto: AuthDto) {
    return this.userService.create(authDto);
  }

  async signIn(authDto: AuthDto) {
    const { login, password } = authDto;

    const user = await this.userService.ensureUserExistsByLogin(
      login,
      ForbiddenException,
      this.frbddnMsg,
    );

    if (!this.userService.validatePassword(password, user)) {
      throw new ForbiddenException(this.frbddnMsg);
    }

    return this.getTokens(user);
  }

  async refresh(refreshTokenDto: RefreshTokenDto) {
    const { refreshToken } = refreshTokenDto;

    try {
      const payload = await this.jwtService.verifyAsync(
        refreshToken,
        this.refreshTokenOptions,
      );

      const user = await this.userService.ensureUserExistsByLogin(
        payload.login,
        ForbiddenException,
        this.frbddnMsg,
      );

      return this.getTokens(user);
    } catch {
      throw new ForbiddenException(this.frbddnMsg);
    }
  }
}
