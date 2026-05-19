import {
  Controller, Get, Patch, Post, Delete, Body,
  UseGuards, HttpCode, HttpStatus, Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from './schemas/user.schema';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // ── Perfil propio ─────────────────────────────────────────────────────────

  @Get('me')
  async getProfile(@CurrentUser('_id') userId: string) {
    return this.usersService.findById(userId);
  }

  @Patch('me')
  async updateProfile(
    @CurrentUser('_id') userId: string,
    @Body() dto: UpdateUserDto,
  ) {
    return this.usersService.updateProfile(userId, dto);
  }

  @Post('me/diagnostic')
  @HttpCode(HttpStatus.OK)
  async completeDiagnostic(
    @CurrentUser('_id') userId: string,
    @Body() scores: {
      crud: number;
      aggregation: number;
      indexes: number;
      modeling: number;
      security: number;
    },
  ) {
    return this.usersService.completeDiagnostic(userId, scores);
  }

  // ── Panel Profesor / Admin — listado de estudiantes ───────────────────────

  @Get('students')
  @UseGuards(RolesGuard)
  @Roles(UserRole.PROFESSOR, UserRole.ADMIN)
  async getStudents() {
    return this.usersService.findAllStudents();
  }

  @Get('students/:id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.PROFESSOR, UserRole.ADMIN)
  async getStudent(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  // ── Atlas URI (playground con conexión propia) ────────────────────────────

  /** Guarda y valida la URI de Atlas del estudiante */
  @Post('me/atlas-uri')
  @HttpCode(HttpStatus.OK)
  async saveAtlasUri(
    @CurrentUser('_id') userId: string,
    @Body() body: { uri: string },
  ) {
    return this.usersService.saveAtlasUri(userId, body.uri);
  }

  /** Verifica si el estudiante tiene URI configurada y si conecta */
  @Get('me/atlas-uri/status')
  async getAtlasStatus(@CurrentUser('_id') userId: string) {
    return this.usersService.getAtlasStatus(userId);
  }

  /** Elimina la URI de Atlas */
  @Delete('me/atlas-uri')
  @HttpCode(HttpStatus.OK)
  async removeAtlasUri(@CurrentUser('_id') userId: string) {
    await this.usersService.removeAtlasUri(userId);
    return { message: 'Conexión de Atlas eliminada correctamente' };
  }

  // ── Admin — cambiar rol de un usuario ─────────────────────────────────────

  @Patch(':id/role')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async changeRole(
    @Param('id') id: string,
    @Body() body: { role: UserRole },
  ) {
    return this.usersService.updateProfile(id, { role: body.role } as any);
  }
}
