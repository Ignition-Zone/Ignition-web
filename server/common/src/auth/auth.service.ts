import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import _ from 'lodash';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      return _.omit(user, ['password']);
    }
    return null;
  }

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ accessToken: string }> {
    const user = await this.usersService.findOne(username);

    if (!user || user?.password !== pass) {
      throw new HttpException(
        '您输入的账号或密码有误',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const payload = { sub: user.userId, username: user.username };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
