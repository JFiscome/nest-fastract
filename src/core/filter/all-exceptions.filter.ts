import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    
    // default message content
    let message: string | object = '服务端异常';
    let statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR;
    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      
      /**
       * 这边自己抛出的异常和class-validate抛出的异常格式不一样
       * 所以要做一下兼容，一个是数组，一个是字符串
       */
      const errorResponse: string | object = exception.getResponse();
      
      // @ts-ignore
      if (typeof errorResponse === 'object' && errorResponse.message) {
        // @ts-ignore
        message = typeof errorResponse.message === 'string' ? errorResponse.message : errorResponse.message.join();
      } else {
        message = errorResponse;
      }
    }
    
    
    if (process.env.NODE_ENV !== 'production') {
      console.error(exception);
    }
    
    const responseData = {
      statusCode: statusCode,
      message: message,
      time: new Date().toLocaleString()
    };
    
    console.log('响应内容：', responseData);
    
    response.status(statusCode);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(responseData);
  }
}
