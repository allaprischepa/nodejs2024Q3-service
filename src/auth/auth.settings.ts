import { SetMetadata } from '@nestjs/common';
import 'dotenv/config';
import { env } from 'process';

export const jwtSettings = {
  secret_key: env.JWT_SECRET_KEY,
  refresh_secret_key: env.JWT_SECRET_REFRESH_KEY,
  expire_time: env.TOKEN_EXPIRE_TIME,
  refresh_expire_time: env.TOKEN_REFRESH_EXPIRE_TIME,
};

export const tokenOptions = {
  secret: jwtSettings.secret_key,
  expiresIn: jwtSettings.expire_time,
};

export const refreshTokenOptions = {
  secret: jwtSettings.refresh_secret_key,
  expiresIn: jwtSettings.refresh_expire_time,
};

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const IS_REFRESH_TOKEN_REQUIRED_KEY = 'isRefreshTokenRequired';
export const RefreshTokenRequired = () =>
  SetMetadata(IS_REFRESH_TOKEN_REQUIRED_KEY, true);

export const messages = {
  required_rfrsh_token: 'Refresh Token required',
  invalid_rfrsh_token: 'Invalid Refresh Token',
  expired_rfrsh_token: 'Expired Refresh Token',
  forbidden: 'Login or password is incorrect',
};
