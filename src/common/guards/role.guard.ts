import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/common/entities/role.enum';
import { ROLES_KEY } from 'src/common/entities/roles.decorator';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndMerge<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log('hello world');
    if (!requiredRoles) {
      return true;
    }
    console.log('HANDLER NEED ROLES');
    console.log(requiredRoles);
    const { user } = context.switchToHttp().getRequest<{ user: User }>();
    console.log({ user });
    return requiredRoles.some((role) => user.roles.includes(role));
  }
}
