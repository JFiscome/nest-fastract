import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SALT')
    } as StrategyOptions);
  }
  
  async validate(payload: any) {
    console.log('this is the payload', payload);
    
    /**
     * 这边可以再增加一个校验时间token过期时间的
     * 然后在返回体那边根据相关的payload内容
     * 看是否重置token - 然后前端发起token刷新
     * 这边可以做一些相关操作
     */
    
    return payload;
  }
}