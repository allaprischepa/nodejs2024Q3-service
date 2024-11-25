import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RefreshTokenRequired, Public } from './auth.settings';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @ApiOperation({ summary: 'Sign Up' })
  @ApiResponse({
    status: 201,
    description: 'User signed up successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: request body does not contain required fields',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict: user already exists',
  })
  @Post('signup')
  signUp(@Body() authDto: AuthDto) {
    return this.authService.signUp(authDto);
  }

  @Public()
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({
    status: 200,
    description: 'User logged in successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: request body does not contain required fields',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden: authentication failed',
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() authDto: AuthDto) {
    return this.authService.signIn(authDto);
  }

  @RefreshTokenRequired()
  @ApiOperation({ summary: 'Get new pair of Access token and Refresh token' })
  @ApiResponse({
    status: 200,
    description: 'Tokens refreshed successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized: request body does not contain refreshToken',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden: refreshToken is invalid or expired',
  })
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refresh(refreshTokenDto);
  }
}
