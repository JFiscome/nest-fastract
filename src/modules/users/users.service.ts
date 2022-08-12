import { BadRequestException, HttpException, HttpStatus, Injectable, UseGuards } from '@nestjs/common';
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
  
  async generateToken(payload) {
    return this.jwtService.sign(payload);
  }
  
  findAll() {
    return this.userRepository.find();
  }
  
  findOne(id: number) {
    return this.userRepository.findOneBy({ uid: id });
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
