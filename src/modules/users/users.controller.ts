import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseInterceptors, ClassSerializerInterceptor
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserLoginDTO } from './dto/user-login.dot';

@Controller('users')

// 隐藏掉相关字段内容
// 例如在创建用户那里、隐藏了密码字段
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @Post('register')
  @ApiOperation({ summary: '新用户注册' })
  @ApiResponse({ status: HttpStatus.CREATED, type: CreateUserDto })
  async register(@Body() newUserInfo: CreateUserDto): Promise<object> {
    return this.usersService.register(newUserInfo);
  }
  
  @Post('login')
  @ApiOperation({ summary: '用户登录' })
  @ApiResponse({ status: HttpStatus.OK, type: CreateUserDto })
  async login(@Body() data: UserLoginDTO): Promise<object> {
    const { uid, role } = await this.usersService.userLogin(data);
    
    // generate token
    return { token: await this.usersService.generateToken({ uid: uid, role: role }) };
    
  }
  
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }
  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
