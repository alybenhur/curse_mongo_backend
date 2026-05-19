import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument, UserRole } from './schemas/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).select('+password').exec();
  }

  async findAllStudents(): Promise<UserDocument[]> {
    return this.userModel
      .find({ role: UserRole.STUDENT, isActive: true })
      .select('-password')
      .sort({ createdAt: -1 })
      .exec();
  }

  async findById(id: string): Promise<UserDocument> {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  async create(data: {
    name: string;
    email: string;
    password: string;
    avatarUrl?: string;
  }): Promise<UserDocument> {
    const existing = await this.userModel.findOne({ email: data.email }).exec();
    if (existing) throw new ConflictException('El correo ya está registrado');

    const hashed = await bcrypt.hash(data.password, 12);
    const user = new this.userModel({ ...data, password: hashed });
    return user.save();
  }

  async updateProfile(id: string, dto: UpdateUserDto): Promise<UserDocument> {
    const user = await this.userModel
      .findByIdAndUpdate(id, { $set: dto }, { new: true })
      .exec();
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  async updateStreak(id: string): Promise<void> {
    const user = await this.findById(id);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (user.lastActiveDate) {
      const last = new Date(user.lastActiveDate);
      last.setHours(0, 0, 0, 0);
      const diffDays = Math.floor((today.getTime() - last.getTime()) / 86400000);

      if (diffDays === 1) {
        // Día consecutivo
        await this.userModel.findByIdAndUpdate(id, {
          $inc: { streak: 1 },
          lastActiveDate: new Date(),
        });
      } else if (diffDays > 1) {
        // Racha rota
        await this.userModel.findByIdAndUpdate(id, {
          streak: 1,
          lastActiveDate: new Date(),
        });
      }
      // diffDays === 0 → mismo día, no cambiar
    } else {
      await this.userModel.findByIdAndUpdate(id, {
        streak: 1,
        lastActiveDate: new Date(),
      });
    }
  }

  async addXp(id: string, points: number): Promise<UserDocument> {
    const user = await this.userModel
      .findByIdAndUpdate(id, { $inc: { xp: points } }, { new: true })
      .exec();
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  async completeDiagnostic(
    id: string,
    scores: {
      crud: number;
      aggregation: number;
      indexes: number;
      modeling: number;
      security: number;
    },
  ): Promise<UserDocument> {
    const user = await this.userModel
      .findByIdAndUpdate(
        id,
        { $set: { diagnosticScores: scores, diagnosticCompleted: true } },
        { new: true },
      )
      .exec();
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }
}
