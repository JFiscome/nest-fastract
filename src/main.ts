import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // 自动文档生成器swagger
  const options = new DocumentBuilder()
  .setTitle('nest fastract')
  .setDescription('The nest fastract Api document')
  .setVersion('1.0.0')
  .addTag('fastract')
  .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('fastract-api', app, document);
  
  await app.listen(3000);
}

// 引导
bootstrap().then(r => {
  console.log('FASTRACT SERVER RUN AT localhost:3000');
});
