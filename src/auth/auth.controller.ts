import { Controller, Get, HttpCode } from '@nestjs/common';

@Controller({ path: 'auth', version: 'v1' })
export class AuthController {
  constructor() {
    //
  }

  @Get('login')
  @HttpCode(200)
  async getLogin(): Promise<boolean> {
    return true;
  }
}
