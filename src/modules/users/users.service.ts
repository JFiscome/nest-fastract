import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { compareSync } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}
  
  async register(createUserDto: CreateUserDto) {
    await this.checkUserNameIsRegister(createUserDto.username);
    const newUser = await this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }
  
  async userLogin({ username, password }): Promise<User> {
    const user = await this.userRepository.findOne({
      select: ['uid', 'role', 'password'],
      where: { username }
    });
    if (!user) {
      throw new BadRequestException('用户名错误');
    }
    
    // 校验密码
    if (!compareSync(password, user.password)) {
      throw new BadRequestException('密码错误');
    }
    return user;
  }
  
  async generateToken(payload) {
    console.log('this is the payload:', payload);
    return this.jwtService.sign(payload);
  }
  
  findAll() {
    return `This action returns all users`;
  }
  
  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
  
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }
  
  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  
  async checkUserNameIsRegister(username: string): Promise<void> {
    const exist = await this.userRepository.findOneBy({ username: username });
    if (exist) throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST);
  }
}
