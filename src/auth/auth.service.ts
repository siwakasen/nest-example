import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signToken(userID: number, email: string): Promise<string> {
    const payload = { sub: userID, email };

    return this.jwt.sign(payload, {
      secret: this.config.get('JWT_SECRET'),
      expiresIn: '15m',
    });
  }

  async signup(dto: AuthDto): Promise<{ message: string; token: string }> {
    // hash the password
    const hashedPassword = await argon.hash(dto.password);
    // save the new user to the database
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash: hashedPassword,
        },
      });

      return {
        message: 'signup',
        token: await this.signToken(user.id, user.email),
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Creadentials taken');
        }
      }
      throw error;
    }
  }
  async signin(dto: AuthDto): Promise<{ message: string; token: string }> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('Invalid credentials');
    }

    const isPasswordValid = await argon.verify(user.hash, dto.password);

    if (!isPasswordValid) {
      throw new ForbiddenException('Invalid credentials');
    }

    return {
      message: 'signin',
      token: await this.signToken(user.id, user.email),
    };
  }
}
