import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Put,
  HttpCode,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import {
  ApiExtraModels,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { AlbumEntity } from './entities/album.entity';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  /**
   * Create new album
   * @param createAlbumDto
   * @returns
   */
  @ApiOperation({ summary: 'Create new album' })
  @ApiExtraModels(AlbumEntity)
  @ApiResponse({
    status: 201,
    description: 'Created: album created successfully',
    type: AlbumEntity,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: request body does not contain required fields',
  })
  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  /**
   * Get all albums
   * @returns
   */
  @ApiOperation({ summary: 'Get all albums' })
  @ApiExtraModels(AlbumEntity)
  @ApiResponse({
    status: 200,
    description: 'OK: retrieved album list',
    type: AlbumEntity,
    isArray: true,
  })
  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  /**
   * Get single album by id
   * @param id
   * @returns
   */
  @ApiOperation({ summary: 'Get single album by id' })
  @ApiParam({
    name: 'id',
    description: 'The ID (UUID) of the album',
    example: '7429cef1-0a5d-4fdd-9df4-2443d486d34a',
  })
  @ApiExtraModels(AlbumEntity)
  @ApiResponse({
    status: 200,
    description: 'OK: retrieved album',
    type: AlbumEntity,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: id is not valid UUID',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found: album not found',
  })
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.albumService.findOne(id);
  }

  /**
   * Update album info
   * @param id
   * @param updateAlbumDto
   * @returns
   */
  @ApiOperation({ summary: 'Update album info' })
  @ApiParam({
    name: 'id',
    description: 'The ID (UUID) of the album',
    example: '7429cef1-0a5d-4fdd-9df4-2443d486d34a',
  })
  @ApiExtraModels(AlbumEntity)
  @ApiResponse({
    status: 200,
    description: 'OK: updated album',
    type: AlbumEntity,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: id is not valid UUID',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found: album not found',
  })
  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return this.albumService.update(id, updateAlbumDto);
  }

  /**
   * Delete album
   * @param id
   * @returns
   */
  @ApiOperation({ summary: 'Delete album' })
  @ApiParam({
    name: 'id',
    description: 'The ID (UUID) of the album',
    example: '7429cef1-0a5d-4fdd-9df4-2443d486d34a',
  })
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.albumService.remove(id);
  }
}
