import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const nowTimestamp = Date.now();
    
    const request = context.switchToHttp().getRequest();
    /**
     * 日期时间
     */
    const dateTime = new Date().toLocaleString();
    /**
     * ip地址
     */
    const ip = request.ip;
    /**
     * UA信息
     */
    const userAgent = request.headers['user-agent'];
    /**
     * 接口地址
     */
    const path = request.originalUrl;
    /**
     * 请求方法
     */
    const method = request.method;
    
    return next.handle().pipe(
      tap(() => {
        Logger.log(`${dateTime},${ip},${userAgent},${method},${path} => cost:${Date.now() - nowTimestamp}ms`);
      })
    );
  }
}
