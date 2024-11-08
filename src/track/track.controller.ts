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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import {
  ApiExtraModels,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { TrackEntity } from './entities/track.entity';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  /**
   * Create new track
   * @param createTrackDto
   * @returns
   */
  @ApiOperation({ summary: 'Create new track' })
  @ApiExtraModels(TrackEntity)
  @ApiResponse({
    status: 201,
    description: 'Created: track created successfully',
    type: TrackEntity,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: request body does not contain required fields',
  })
  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  /**
   * Get all tracks
   * @returns
   */
  @ApiExtraModels(TrackEntity)
  @ApiResponse({
    status: 200,
    description: 'OK: retrieved track list',
    type: TrackEntity,
    isArray: true,
  })
  @ApiOperation({ summary: 'Get all tracks' })
  @Get()
  findAll() {
    return this.trackService.findAll();
  }

  /**
   * Get track by id
   * @param id
   * @returns
   */
  @ApiOperation({ summary: 'Get track by id' })
  @ApiParam({
    name: 'id',
    description: 'The ID (UUID) of the track',
    example: 'a0030c1c-6e2a-45fe-9653-6a8be16be998',
  })
  @ApiExtraModels(TrackEntity)
  @ApiResponse({
    status: 200,
    description: 'OK: retrieved track',
    type: TrackEntity,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: id is not valid UUID',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found: track not found',
  })
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.trackService.findOne(id);
  }

  /**
   * Update track info
   * @param id
   * @param updateTrackDto
   * @returns
   */
  @ApiOperation({ summary: 'Update track info' })
  @ApiParam({
    name: 'id',
    description: 'The ID (UUID) of the track',
    example: 'a0030c1c-6e2a-45fe-9653-6a8be16be998',
  })
  @ApiExtraModels(TrackEntity)
  @ApiResponse({
    status: 200,
    description: 'OK: updated track',
    type: TrackEntity,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: id is not valid UUID',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found: track not found',
  })
  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    return this.trackService.update(id, updateTrackDto);
  }

  /**
   * Delete track
   * @param id
   * @returns
   */
  @ApiOperation({ summary: 'Delete track' })
  @ApiParam({
    name: 'id',
    description: 'The ID (UUID) of the track',
    example: 'a0030c1c-6e2a-45fe-9653-6a8be16be998',
  })
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.trackService.remove(id);
  }
}
