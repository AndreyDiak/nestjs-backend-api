import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserInput } from 'src/inputs/user.input';
import { UserService } from '../user/user.service';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.findOneByUsername(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user._id!, username: user.userName };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(body: CreateUserInput) {
    try {
      const candidate = this.userService.findOneByEmail(body.email);
      if (candidate) {
        throw new BadRequestException('email already taken');
      }
    } catch {}
    try {
      const candidate = this.userService.findOneByUsername(body.userName);
      if (candidate) {
        throw new BadRequestException('username already taken');
      }
    } catch {}

    const hashedPassword = await bcrypt.hash(body.password, 10);
    const newUser = {
      ...body,
      password: hashedPassword,
    };
    await this.userService.create(newUser);
    return this.signIn(body.fullName, hashedPassword);
  }
}
