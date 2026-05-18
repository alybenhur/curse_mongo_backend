import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../users/schemas/user.schema';
import { ROLES_KEY } from '../../auth/guards/roles.guard';

export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
