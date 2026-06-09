import {
    CanActivate,
    ExecutionContext,
    Injectable,
    ForbiddenException,
    UnauthorizedException,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { ROLES_KEY, Role } from './roles.decorator';
  
  @Injectable()
  export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
  
    canActivate(context: ExecutionContext): boolean {
      const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
  
      // если на роуте нет декоратора @Roles — доступ открыт всем
      if (!requiredRoles) return true;
  
      const request = context.switchToHttp().getRequest();
      const role = request.headers['x-role'] as Role; // роль передаётся в заголовке
  
      if (!role) throw new UnauthorizedException('Роль не указана');
  
      if (!requiredRoles.includes(role)) {
        throw new ForbiddenException(`Доступ только для: ${requiredRoles.join(', ')}`);
      }
  
      return true;
    }
  }