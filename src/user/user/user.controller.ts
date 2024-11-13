import { Controller, Ip, HostParam, Query, Param } from '@nestjs/common';
import { Get, Post } from '@nestjs/common';

@Controller('/api/users')
export class UserController {
  @Get()
  get(@Ip() ip: string, @HostParam() host: string[]): string {
    // host is an object
    return `Your IP address is ${ip} and your host is ${JSON.stringify(host)}`;
  }

  @Post()
  create(): string {
    return 'This action adds a new user';
  }

  @Get('/hello')
  hello(@Query('name') name: string, @Query('age') age: number): string {
    return `Hello ${name}! You are ${age} years old.`;
  }
  @Get('/:id')
  getUserById(@Param('id') id: string): string {
    return `Get user with id ${id}`;
  }
}
