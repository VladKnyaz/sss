import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { AuthLoginDto } from './dto/auth.login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    name: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.findOneByName(name);
    if (!user) return null;

    const isValidPassword = await bcrypt.compare(user.password, password);

    if (user && isValidPassword) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: AuthLoginDto) {
    const validUser = await this.validateUser(user.name, user.password);
    if (!validUser) return null;

    const payload = { name: validUser.name, id: validUser.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
