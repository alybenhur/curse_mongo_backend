import {
  Controller, Post, Get, Delete, Body, Query,
  UseGuards, HttpCode, HttpStatus, ParseIntPipe, DefaultValuePipe,
} from '@nestjs/common';
import { PlaygroundService } from './playground.service';
import { ExecuteQueryDto } from './dto/execute-query.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('playground')
@UseGuards(JwtAuthGuard)
export class PlaygroundController {
  constructor(private readonly playgroundService: PlaygroundService) {}

  // Ejecutar query en el sandbox del estudiante
  @Post('execute')
  @HttpCode(HttpStatus.OK)
  execute(
    @CurrentUser('_id') userId: string,
    @Body() dto: ExecuteQueryDto,
  ) {
    return this.playgroundService.executeQuery(userId, dto.query, dto.stageOrder);
  }

  // Historial de queries del estudiante
  @Get('history')
  getHistory(
    @CurrentUser('_id') userId: string,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
  ) {
    return this.playgroundService.getHistory(userId, limit);
  }

  // Colecciones disponibles en el sandbox
  @Get('collections')
  getCollections(@CurrentUser('_id') userId: string) {
    return this.playgroundService.getSandboxCollections(userId);
  }

  // Limpiar sandbox (eliminar todas las colecciones)
  @Delete('sandbox')
  @HttpCode(HttpStatus.OK)
  clearSandbox(@CurrentUser('_id') userId: string) {
    return this.playgroundService.clearSandbox(userId);
  }

  // Snippets precargados por etapa
  @Get('snippets')
  getSnippets(
    @Query('stage', new DefaultValuePipe(1), ParseIntPipe) stage: number,
  ) {
    return this.playgroundService.getSnippetsByStage(stage);
  }

  // Info de la BD Atlas del estudiante
  @Get('sandbox-info')
  getSandboxInfo(@CurrentUser('_id') userId: string) {
    return this.playgroundService.getAtlasInfo(userId);
  }
}
