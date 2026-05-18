import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  private generateTokens(payload: { sub: string; email: string; role: string; name: string }) {
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET') as string,
      expiresIn: (this.configService.get<string>('JWT_EXPIRES_IN', '8h')) as any,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET') as string,
      expiresIn: (this.configService.get<string>('JWT_REFRESH_EXPIRES_IN', '7d')) as any,
    });

    return { accessToken, refreshToken };
  }

  async register(dto: RegisterDto) {
    const user = await this.usersService.create({
      name: dto.name,
      email: dto.email,
      password: dto.password,
      avatarUrl: dto.avatarUrl,
    });

    const payload = {
      sub: (user._id as any).toString(),
      email: user.email,
      role: user.role,
      name: user.name,
    };

    const tokens = this.generateTokens(payload);

    return {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        level: user.level,
        xp: user.xp,
        streak: user.streak,
        diagnosticCompleted: user.diagnosticCompleted,
        avatarUrl: user.avatarUrl,
      },
      ...tokens,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Credenciales incorrectas');

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Credenciales incorrectas');

    if (!user.isActive)
      throw new UnauthorizedException('Cuenta desactivada. Contacta al administrador');

    // Actualizar racha al hacer login
    await this.usersService.updateStreak((user._id as any).toString());

    const payload = {
      sub: (user._id as any).toString(),
      email: user.email,
      role: user.role,
      name: user.name,
    };

    const tokens = this.generateTokens(payload);

    return {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        level: user.level,
        xp: user.xp,
        streak: user.streak,
        diagnosticCompleted: user.diagnosticCompleted,
        avatarUrl: user.avatarUrl,
      },
      ...tokens,
    };
  }

  async refreshTokens(userId: string, email: string, role: string) {
    const user = await this.usersService.findById(userId);
    if (!user || !user.isActive) {
      throw new UnauthorizedException('Acceso denegado');
    }

    const payload = { sub: userId, email, role, name: user.name };
    return this.generateTokens(payload);
  }

  async getProfile(userId: string) {
    return this.usersService.findById(userId);
  }
}
