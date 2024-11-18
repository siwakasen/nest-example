import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { AuthDto } from 'src/auth/dto';
import { JwtGuard } from 'src/auth/guard';

@Controller('users')
export class UserController {
  @UseGuards(JwtGuard)
  @Get('me')
  @HttpCode(HttpStatus.OK)
  getMe(@GetUser() user: AuthDto): Record<string, any> {
    return {
      message: 'Hello from the user controller',
      data: user,
    };
  }
}
