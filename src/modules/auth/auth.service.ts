import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from '../users/entities/user.entity';
import { compareSync } from 'bcryptjs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}
  
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
  
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }
  
  findAll() {
    return `This action returns all auth`;
  }
  
  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }
  
  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }
  
  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
