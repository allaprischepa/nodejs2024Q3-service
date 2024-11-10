import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import {
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FavsEntity } from './entities/favs.entity';

@ApiTags('Favorites')
@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  /**
   * Get all favorites
   * @returns
   */
  @ApiOperation({ summary: 'Get all favorites' })
  @ApiExtraModels(FavsEntity)
  @ApiResponse({
    status: 200,
    description: 'OK: retrieved favorites',
    type: FavsEntity,
  })
  @Get()
  findAll() {
    return this.favsService.findAll();
  }

  /**
   * Add track to the favorites
   * @param id
   * @returns
   */
  @ApiOperation({ summary: 'Add track to the favorites' })
  @ApiResponse({
    status: 201,
    description: 'Created: track added to the favorites',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: id is not valid UUID',
  })
  @ApiResponse({
    status: 422,
    description: 'Unprocessable Content: track not found',
  })
  @Post('track/:id')
  addTRack(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.addTrack(id);
  }

  /**
   * Delete track from favorites
   * @param id
   * @returns
   */
  @ApiOperation({ summary: 'Delete track from favorites' })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: id is not valid UUID',
  })
  @ApiResponse({
    status: 404,
    description: 'Bad Request: track is not in the favorites',
  })
  @Delete('track/:id')
  @HttpCode(204)
  removeTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.removeTrack(id);
  }

  /**
   * Add album to the favorites
   * @param id
   * @returns
   */
  @ApiOperation({ summary: 'Add album to the favorites' })
  @ApiResponse({
    status: 201,
    description: 'Created: album added to the favorites',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: id is not valid UUID',
  })
  @ApiResponse({
    status: 422,
    description: 'Unprocessable Content: album not found',
  })
  @Post('album/:id')
  addAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.addAlbum(id);
  }

  /**
   * Delete album from favorites
   * @param id
   * @returns
   */
  @ApiOperation({ summary: 'Delete album from favorites' })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: id is not valid UUID',
  })
  @ApiResponse({
    status: 404,
    description: 'Bad Request: album is not in the favorites',
  })
  @Delete('album/:id')
  @HttpCode(204)
  removeAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.removeAlbum(id);
  }

  /**
   * Add artist to the favorites
   * @param id
   * @returns
   */
  @ApiOperation({ summary: 'Add artist to the favorites' })
  @ApiResponse({
    status: 201,
    description: 'Created: artist added to the favorites',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: id is not valid UUID',
  })
  @ApiResponse({
    status: 422,
    description: 'Unprocessable Content: artist not found',
  })
  @Post('artist/:id')
  addArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.addArtist(id);
  }

  /**
   * Delete artist from favorites
   * @param id
   * @returns
   */
  @ApiOperation({ summary: 'Delete artist from favorites' })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: id is not valid UUID',
  })
  @ApiResponse({
    status: 404,
    description: 'Bad Request: artist is not in the favorites',
  })
  @Delete('artist/:id')
  @HttpCode(204)
  removeArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.removeArtist(id);
  }
}
