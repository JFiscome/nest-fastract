import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import loadConfigurations from '../../common/configuration';

const libModules = [
  ConfigModule.forRoot({
    load: [loadConfigurations],
    envFilePath: process.env.NODE_ENV === 'production' ? '.production.env' : '.default.env'
  }),
  
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (cs: ConfigService) => {
      console.log(cs.get('mysql'));
      return cs.get('mysql');
    }
  })

];

// 业务相关的模块
const businessModules = [
  UsersModule
];

@Module({
  imports: [...libModules, ...businessModules],
  controllers: [],
  providers: []
})
export class AppModule {}
