import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './core/filter/all-exceptions.filter';
import { AllResponseInterceptor } from './core/interceptor/all-response.interceptor';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  /**
   * 设置全局路由前缀
   */
  app.setGlobalPrefix('fastract');
  
  
  /**
   * 设置全局的校验参数过滤器
   */
  app.useGlobalPipes(new ValidationPipe());
  
  /**
   * 注册全局统一异常处理器
   */
  app.useGlobalFilters(new AllExceptionsFilter());
  
  
  /**
   * 全局统一响应内容设置
   */
  app.useGlobalInterceptors(new AllResponseInterceptor());
  
  
  // 自动文档生成器swagger
  const options = new DocumentBuilder()
  .setTitle('nest fastract')
  .setDescription('The nest fastract Api document')
  .setVersion('1.0.0')
  .addTag('fastract')
  .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('fastract-api-docs', app, document);
  
  await app.listen(3000);
}

// 引导
bootstrap().then(r => {
  console.log('FASTRACT SERVER RUN AT localhost:3000');
});
