import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  get() {
    return {
      message: 'Welcome to the Nest API',
    };
  }
}
