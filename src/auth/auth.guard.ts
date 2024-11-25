import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { Request } from 'express';
import {
  IS_PUBLIC_KEY,
  IS_REFRESH_TOKEN_REQUIRED_KEY,
  messages,
  refreshTokenOptions,
  tokenOptions,
} from './auth.settings';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.isPublic(context);
    const isRefreshTokenRequired = this.isRefreshTokenRequired(context);
    const request = context.switchToHttp().getRequest();

    if (isPublic) return true; // No authentication required.

    if (isRefreshTokenRequired) return this.handleRefreshTokenAccess(request);

    return this.handleAccess(request);
  }

  private isPublic(context: ExecutionContext) {
    return this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
  }

  private isRefreshTokenRequired(context: ExecutionContext) {
    return this.reflector.getAllAndOverride<boolean>(
      IS_REFRESH_TOKEN_REQUIRED_KEY,
      [context.getHandler(), context.getClass()],
    );
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }

  private extractRefreshTokenFromBody(request: Request): string | undefined {
    return request.body.refreshToken;
  }

  private async handleAccess(request: Request) {
    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException();

    try {
      const payload = await this.jwtService.verifyAsync(token, tokenOptions);

      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private async handleRefreshTokenAccess(request: Request) {
    const refreshToken = this.extractRefreshTokenFromBody(request);

    if (!refreshToken)
      throw new UnauthorizedException(messages.required_rfrsh_token);

    try {
      const payload = await this.jwtService.verifyAsync(
        refreshToken,
        refreshTokenOptions,
      );

      request['user'] = payload;
    } catch (err) {
      const msg =
        err instanceof TokenExpiredError
          ? messages.expired_rfrsh_token
          : messages.invalid_rfrsh_token;

      throw new ForbiddenException(msg);
    }

    return true;
  }
}
