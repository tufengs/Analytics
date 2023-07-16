import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { compare } from 'bcrypt';

interface IJwtPayload {
  email: string;
  company: string;
  baseUrl: string;
  role: string;
  sub: string;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async impersonate(id) {
    const user = await this.usersService.findOne(id);

    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signIn(email, pass) {
    const user = await this.usersService.findOneByEmail(email);
    const areEqual = await compare(pass, user.password);

    if (!areEqual) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      app_id: user.application?.id
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp({ email, password, company, baseUrl }): Promise<User> {
    const userCreated = await this.usersService.create({
      email,
      password,
      company,
      baseUrl
    });

    return userCreated;
  }
}
