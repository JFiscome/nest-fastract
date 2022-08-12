import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { md5 } from '../../utils/crypto-tool';

// 路由白名单
const apiWhiteList: string[] = [
  'wxpay/notify',
  'alipay/notify'
];


@Injectable()
export class ApiSaltGuard implements CanActivate {
  
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    
    const lft: string = request.header('lft');
    const timestamp: number = +request.header('timestamp');
    
    /**
     * 校验路由白名单
     * 白名单中的路由直接返回true
     */
    if (apiWhiteList.indexOf(request.path) > -1) {
      return true;
    }
    
    if (!lft || !timestamp) {
      throw new ForbiddenException('lft salt check failed~');
    }
    
    const saltString: string = md5([process.env.API_SALT_KEY, request.path, timestamp].join('<|>'));
    console.log(Date.now(), saltString);
    
    if (lft !== saltString) {
      throw new ForbiddenException('lft salt check failed!');
    }
    
    /**
     * 时间校验
     */
    if (Date.now() - timestamp > 5 * 60 * 1000 || timestamp > Date.now()) {
      throw new BadRequestException('lft salt timestamp expired!');
    }
    
    //全部校验通过，返回true
    return true;
  }
}
