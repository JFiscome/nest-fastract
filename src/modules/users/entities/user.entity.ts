// use/entities/user.entity.ts
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { EnumsUserRole } from '../../../common/enums';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  uid: number;
  
  @Column({ length: 100 })
  username: string; // 用户名
  
  @Column({ length: 100, nullable: false, default: '' })
  nickname: string;  //昵称
  
  @Column({ nullable: false, select: false })
  @Exclude()
  password: string;  // 密码
  
  @Column({
    nullable: false,
    default: ''
  })
  avatar: string;   //头像
  
  @Column({
    nullable: false,
    default: ''
  })
  email: string;
  
  @Column('simple-enum', { enum: EnumsUserRole })
  role: string;   // 用户角色
  
  @Column({
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createTime: Date;
  
  @Column({
    name: 'update_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'
  })
  updateTime: Date;
  
  @BeforeInsert()
  async encryptPwd() {
    
    this.nickname = this.nickname || 'YOUTH123';
    
    this.password = await bcrypt.hashSync(this.password, 10);
  }
}