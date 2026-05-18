import { Controller, Get, Patch, Post, Body, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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

  // POST /api/users/me/diagnostic — Guardar resultado del diagnóstico inicial
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
}
