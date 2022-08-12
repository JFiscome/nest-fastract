import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../../common/strategys/local.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { JwtStrategy } from '../../common/strategys/jwt.strategy';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule
  ],
  controllers: [AuthController],
  providers: [
    ConfigService,
    AuthService,
    LocalStrategy,
    JwtStrategy
  ]
})
export class AuthModule {}
