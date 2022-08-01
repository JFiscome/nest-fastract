import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Cat } from './interface/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];
  
  create(cat: Cat) {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    this.cats.push(cat);
  }
  
  findAll(): Cat[] {
    return this.cats;
  }
}
