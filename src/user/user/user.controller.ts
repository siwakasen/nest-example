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
  Res,
  Req,
} from '@nestjs/common';

import { Response } from 'express';
import { Request } from 'express';

@Controller('/api/users')
export class UserController {
  // get request
  @Get()
  get(@Ip() ip: string, @HostParam() host: string[]): string {
    // host is an object
    return `Your IP address is ${ip} and your host is ${JSON.stringify(host)}`;
  }

  // post request
  @Post()
  create(): string {
    return 'This action adds a new user';
  }

  // async function
  @Get('/hello')
  async hello(
    @Query('name') name: string,
    @Query('age') age: number,
  ): Promise<string> {
    return `Hello ${name}! You are ${age} years old.`;
  }

  // response with headers json
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

  //redirect
  @Get('/redirect')
  @Redirect()
  redirect(): HttpRedirectResponse {
    return {
      statusCode: 302,
      url: '/api/users/sample',
    };
  }

  //   set cookie
  @Get('/set-cookie')
  setCookie(@Query('name') name: string, @Res() response: Response) {
    response.cookie('name', name);
    response.status(200).send('Cookie is set');
  }

  // get cookie
  @Get('/get-cookie')
  getCookie(@Req() request: Request): string {
    return request.cookies['name'];
  }

  @Get('/:id')
  getUserById(@Param('id') id: string): string {
    return `Get user with id ${id}`;
  }
}
