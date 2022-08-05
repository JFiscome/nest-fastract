import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { EnumsUserRole } from '../../../common/enums';
import { UserLoginDTO } from './user-login.dot';

export class CreateUserDto extends PartialType(UserLoginDTO) {
  
  // 继承 username , password
  @ApiProperty({ description: '用户角色' })
  @IsNotEmpty({ message: '请选择用户角色' })
  @IsEnum(EnumsUserRole)
  readonly role: string;
}
