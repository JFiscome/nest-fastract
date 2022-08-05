import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    
    const message = exception.message || status >= 500 ? '服务端异常!' : '客户端异常!';
    
    const errorResponse = {
      code: -1,
      message: message,
      data: {}
    };
    response.status = status;
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}

/**
 * 该文件弃用
 * 使用 AllExceptions.filter 代替
 */
