import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import moment = require('moment');
import { v4 as uuidv4 } from 'uuid';
import { LoginAuthDTO } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  async validateUser(email: string, password: string): Promise<any> {
    return true;
  }

  async login(loginAuthDTO: LoginAuthDTO): Promise<any> {
    let token: any = {};

    const userUuid: string = uuidv4();
    const expiredDateObj = moment().add(30, 'm').toDate();
    if (loginAuthDTO.email == 'email@castcle.com') {
      token = this.jwtService.sign(
        {
          type: 'people',
          id: userUuid, //id of account
          castcleId: 'castcle-avenger',
          displayName: 'castcle avenger',
          email: 'email@castcle.com',
          avatar: 'url',
          preferredLanguage: ['th', 'en'],
          role: 'member', // member or guest
        },
        { algorithm: 'HS256' }
      );
    } else {
      token = this.jwtService.sign(
        {
          id: userUuid, //id of account
          preferredLanguage: ['th', 'en'],
          role: 'guest', // member or guest
          accessTokenExpiresTime: expiredDateObj, // 30 นาทีจาก create
        },
        { algorithm: 'HS256' }
      );
    }
    return { token: token };
  }

  async getReFeshToken(uuid: string) {
    const expiredDateObj = moment().add(200, 'd').toDate();
    const token = this.jwtService.sign(
      {
        id: uuid, //id of account
        accessTokenExpiresTime: expiredDateObj, // 30 นาทีจาก create
      },
      { algorithm: 'HS256' }
    );

    return { token: token };
  }
}
