import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './dto/auth.dto';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { messages, refreshTokenOptions, tokenOptions } from './auth.settings';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private async getTokens(user: UserEntity) {
    const payload = {
      userId: user.id,
      login: user.login,
    };
    const accessToken = await this.jwtService.signAsync(payload, tokenOptions);
    const refreshToken = await this.jwtService.signAsync(
      payload,
      refreshTokenOptions,
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
      messages.forbidden,
    );

    if (!this.userService.validatePassword(password, user)) {
      throw new ForbiddenException(messages.forbidden);
    }

    return this.getTokens(user);
  }

  async refresh(refreshTokenDto: RefreshTokenDto) {
    const { refreshToken } = refreshTokenDto;

    try {
      const payload = await this.jwtService.verifyAsync(
        refreshToken,
        refreshTokenOptions,
      );

      const user = await this.userService.ensureUserExistsByLogin(
        payload.login,
        ForbiddenException,
        messages.invalid_rfrsh_token,
      );

      return this.getTokens(user);
    } catch (err) {
      const msg =
        err instanceof TokenExpiredError
          ? messages.expired_rfrsh_token
          : messages.invalid_rfrsh_token;

      throw new ForbiddenException(msg);
    }
  }
}
