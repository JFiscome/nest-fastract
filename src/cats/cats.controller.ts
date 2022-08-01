import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './interface/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {
  }
  
  @Get() findAll(): string {
    return 'This is find all cats action';
  }
  
  @Get('/one/:id') findOne(@Param('id') id): object {
    return {
      name: '李剑凡', id: id
    };
  }
  
  @Post()
  async create(@Body() bodyData: CreateCatDto) {
    console.log('bodyData:', bodyData.name);
    this.catsService.create(bodyData);
  }
  
  @Get('/all')
  async findCats(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
