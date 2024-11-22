import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

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
}
