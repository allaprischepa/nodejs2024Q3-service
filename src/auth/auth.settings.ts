import { SetMetadata } from '@nestjs/common';
import 'dotenv/config';
import { env } from 'process';

export const jwtSettings = {
  secret_key: env.JWT_SECRET_KEY,
  refresh_secret_key: env.JWT_SECRET_REFRESH_KEY,
  expire_time: env.TOKEN_EXPIRE_TIME,
  refresh_expire_time: env.TOKEN_REFRESH_EXPIRE_TIME,
};

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const IS_REFRESH_TOKEN_REQUIRED_KEY = 'isRefreshTokenRequired';
export const IsRefreshTokenRequired = () =>
  SetMetadata(IS_REFRESH_TOKEN_REQUIRED_KEY, true);
