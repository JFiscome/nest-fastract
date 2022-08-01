import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { BooksModule } from './books/books.module';

@Module({
  imports: [CatsModule, BooksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
