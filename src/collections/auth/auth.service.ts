import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { CreateUserInput } from 'src/inputs/user.input';
import { UserService } from '../user/user.service';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserInput: CreateUserInput) {
    try {
      const candidate = await this.userService.findOneByEmail(
        createUserInput.email,
      );
      if (candidate) {
        throw new BadRequestException('email already taken');
      }
    } catch {}
    try {
      const candidate = await this.userService.findOneByUsername(
        createUserInput.userName,
      );
      if (candidate) {
        throw new BadRequestException('username already taken');
      }
    } catch {}

    const hashedPassword = await argon2.hash(createUserInput.password);
    const newUser = {
      ...createUserInput,
      password: hashedPassword,
    };
    await this.userService.create(newUser);
    return this.signIn(createUserInput.userName, createUserInput.password);
  }

  async signIn(username: string, pass: string) {
    try {
      const user = await this.userService.findOneByUsername(username);
      const passwordMatches = await argon2.verify(user.password, pass);
      if (!passwordMatches)
        throw new BadRequestException('Password is incorrect');

      const tokens = await this.getTokens(
        user._id as unknown as string,
        user.userName,
      );
      await this.updateRefreshToken(
        user._id as unknown as string,
        tokens.refreshToken,
      );
      return tokens;
    } catch {
      throw new BadRequestException('User does not exist');
    }
  }

  async signOut(userID: string) {
    return this.userService.updateOne(userID, { refreshToken: null });
  }

  async refreshTokens(userID: string, refreshToken: string) {
    const user = await this.userService.findOneByID(userID);
    if (!user || !user.refreshToken) {
      throw new ForbiddenException('Access Denied');
    }
    console.log({ refreshToken, hashed: user.refreshToken });
    const refreshTokenMatches = await argon2.verify(
      user.refreshToken,
      refreshToken,
    );
    if (!refreshTokenMatches) {
      throw new ForbiddenException('Access Denied');
    }
    const tokens = await this.getTokens(userID, user.userName);
    await this.updateRefreshToken(userID, tokens.refreshToken);
    return tokens;
  }

  async updateRefreshToken(userID: string, refreshToken: string) {
    const hashedRefreshToken = await argon2.hash(refreshToken);
    await this.userService.updateOne(userID, {
      refreshToken: hashedRefreshToken,
    });
  }

  async getTokens(userID: string, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userID,
          username,
        },
        {
          secret: this.configService.get('JWT_ACCESS_SECRET'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userID,
          username,
        },
        {
          secret: this.configService.get('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }
}
