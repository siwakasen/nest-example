import {
  Controller,
  Ip,
  HostParam,
  Query,
  Param,
  Get,
  Post,
  Header,
  HttpCode,
  HttpRedirectResponse,
  Redirect,
} from '@nestjs/common';

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
  async hello(
    @Query('name') name: string,
    @Query('age') age: number,
  ): Promise<string> {
    return `Hello ${name}! You are ${age} years old.`;
  }

  @Get('/sample')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  sampleResponse(): Record<string, string> {
    return {
      message: 'This is a sample response',
      status: 'success',
      data: 'This is a sample data',
    };
  }

  @Get('/redirect')
  @Redirect()
  redirect(): HttpRedirectResponse {
    return {
      statusCode: 302,
      url: '/api/users/sample',
    };
  }

  @Get('/:id')
  getUserById(@Param('id') id: string): string {
    return `Get user with id ${id}`;
  }
}
