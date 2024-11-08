import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  Put,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import {
  ApiExtraModels,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { ArtistEntity } from './entities/artist.entity';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  /**
   * Create new artist
   * @param createArtistDto
   * @returns ArtistEntity
   */
  @ApiOperation({ summary: 'Create new artist' })
  @ApiExtraModels(ArtistEntity)
  @ApiResponse({
    status: 201,
    description: 'Created: artist created successfully',
    type: ArtistEntity,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: request body does not contain required fields',
  })
  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  /**
   * Get all artists
   * @returns ArtistEntity[]
   */
  @ApiExtraModels(ArtistEntity)
  @ApiResponse({
    status: 200,
    description: 'OK: retrieved artist list',
    type: ArtistEntity,
    isArray: true,
  })
  @ApiOperation({ summary: 'Get all artists' })
  @Get()
  findAll() {
    return this.artistService.findAll();
  }

  /**
   * Get single artist by id
   * @param id
   * @returns ArtistEntity
   */
  @ApiOperation({ summary: 'Get single artist by id' })
  @ApiParam({
    name: 'id',
    description: 'The ID (UUID) of the artist',
    example: '6476c336-c646-4c28-bbea-7390b385518a',
  })
  @ApiExtraModels(ArtistEntity)
  @ApiResponse({
    status: 200,
    description: 'OK: retrieved artist',
    type: ArtistEntity,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: id is not valid UUID',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found: artist not found',
  })
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.artistService.findOne(id);
  }

  /**
   * Update artist info
   * @param id
   * @param updateArtistDto
   * @returns
   */
  @ApiOperation({ summary: 'Update artist info' })
  @ApiParam({
    name: 'id',
    description: 'The ID (UUID) of the artist',
    example: '6476c336-c646-4c28-bbea-7390b385518a',
  })
  @ApiExtraModels(ArtistEntity)
  @ApiResponse({
    status: 200,
    description: 'OK: updated artist',
    type: ArtistEntity,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: id is not valid UUID',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found: artist not found',
  })
  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return this.artistService.update(id, updateArtistDto);
  }

  /**
   * Delete artist
   * @param id
   * @returns
   */
  @ApiOperation({ summary: 'Delete artist' })
  @ApiParam({
    name: 'id',
    description: 'The ID (UUID) of the artist',
    example: '6476c336-c646-4c28-bbea-7390b385518a',
  })
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.artistService.remove(id);
  }
}
