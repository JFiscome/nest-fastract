import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class UserLoginDTO {
  
  @ApiProperty({ description: '用户名' })
  @IsNotEmpty({ message: '请输入用户名' })
  @Length(2, 8, { message: '用户名长度在2-8个字符之间' })
  readonly username: string;
  
  @ApiProperty({ description: '密码' })
  @IsNotEmpty({ message: '请输入密码' })
  @Length(6, 20, { message: '密码长度在6-20个字符之间' })
  password: string;
  
}
