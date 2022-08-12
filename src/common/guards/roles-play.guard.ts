import { CanActivate, ExecutionContext, ForbiddenException, Injectable, SetMetadata } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

const ROLES_META_KEY = 'roles';

/**
 * 导出路由守卫自定义装饰器
 */
export const Roles = (...roles: string[]) => SetMetadata(ROLES_META_KEY, roles);

@Injectable()
export class RolesPlayGuard implements CanActivate {
  
  constructor(
    private readonly reflector: Reflector
  ) {}
  
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get(ROLES_META_KEY, context.getHandler());
    
    console.log('这边获取到的roles:', roles);
    
    if (!roles) {
      // 接口没有指定role角色
      // 公开接口 直接返回true
      return true;
    } else {
      const user = context.switchToHttp().getRequest().user;
      if (!user) {
        throw new ForbiddenException('请先登录');
      }
      
      /**
       * 判断角色是否存在
       */
      return roles.some((character) => {
        return character === user.role;
      });
    }
    
  }
  
}
