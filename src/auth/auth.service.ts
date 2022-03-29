import { UsersEntity } from './../app/users/users.entity';
import { UsersService } from './../app/users/users.service';
import { HttpStatus, Injectable } from '@nestjs/common';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    let user: UsersEntity;
    try {
      user = await this.userService.findOneOrFail({ email });
    } catch (error) {
      return null;
    }

    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) return null;

    return user;
  }

  async login(user: UsersEntity) {
    const payload = { sud: user.id, email: user.email };

    return {
      token: this.jwtService.sign(payload),
      profiles: user.profile 
    };
  }
  
  decodeToken(jwt: any) {
    this.verifyToken(jwt);
    const user = this.jwtService.decode(jwt)['user'];
    if (user) {
      return user;
    }
  }

  verifyToken(jwt: any) {
    const verify = this.jwtService.verify(jwt);
    if (verify) {
      return true;
    } 
  }
}
