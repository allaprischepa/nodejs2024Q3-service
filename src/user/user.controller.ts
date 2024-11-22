import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  Put,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { AUTH_NAME } from 'src/swagger/swagger-config';

@ApiBearerAuth(AUTH_NAME)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Create a new user
   * @param createUserDto
   * @returns UserEntity
   */
  @ApiOperation({ summary: 'Create new user' })
  @ApiExtraModels(UserEntity)
  @ApiResponse({
    status: 201,
    description: 'Created: user created successfully',
    type: UserEntity,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: request body does not contain required fields',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict: user already exists',
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  /**
   * Get all users
   * @returns UserEntity[]
   */
  @ApiOperation({ summary: 'Get all users' })
  @ApiExtraModels(UserEntity)
  @ApiResponse({
    status: 200,
    description: 'OK: retrieved user list',
    type: UserEntity,
    isArray: true,
  })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  /**
   * Get single user by id
   * @param id
   * @returns UserEntity
   */
  @ApiOperation({ summary: 'Get single user by id' })
  @ApiParam({
    name: 'id',
    description: 'The ID (UUID) of the user',
    example: 'b04df18d-cfe7-4117-80bb-9f5a04d53d23',
  })
  @ApiExtraModels(UserEntity)
  @ApiResponse({
    status: 200,
    description: 'OK: retrieved user',
    type: UserEntity,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: id is not valid UUID',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found: user not found',
  })
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.findOne(id);
  }

  /**
   * Update user password
   * @param id
   * @param updatePasswordDto
   * @returns UserEntity
   */
  @ApiOperation({ summary: 'Update user password' })
  @ApiParam({
    name: 'id',
    description: 'The ID (UUID) of the user',
    example: 'b04df18d-cfe7-4117-80bb-9f5a04d53d23',
  })
  @ApiExtraModels(UserEntity)
  @ApiResponse({
    status: 200,
    description: 'OK: updated user',
    type: UserEntity,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: id is not valid UUID',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found: user not found',
  })
  @Put(':id')
  updatePassword(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.userService.updatePassword(id, updatePasswordDto);
  }

  /**
   * Delete user
   * @param id
   * @returns
   */
  @ApiOperation({ summary: 'Delete user' })
  @ApiParam({
    name: 'id',
    description: 'The ID (UUID) of the user',
    example: 'b04df18d-cfe7-4117-80bb-9f5a04d53d23',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.remove(id);
  }
}
