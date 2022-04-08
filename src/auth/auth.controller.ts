import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CompanyCreate } from './dto/company.create.dto';
import { UserService } from '@module/user/user.service';
import { CompanyService } from '@module/company/company.service';
import { UserCreate, VerifiedStatus } from '@core/interface';
import { UserStatus, UserType } from '@core/enum';
import { Company } from '@module/company/entities/company.entity';

@Controller({ path: 'auth', version: 'v1' })
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly companyService: CompanyService,
  ) {
    //
  }

  @Get('login')
  @HttpCode(200)
  async getLogin(): Promise<boolean> {
    return true;
  }

  @Post('register')
  async createCompany(@Body() data: CompanyCreate): Promise<HttpStatus> {
    // check email if already been taken
    const emailCheck = await this.userService.checkEmailExist(data.email);
    if (emailCheck) throw new ConflictException('Email Address already taken.');

    const usernameCheck = await this.userService.checkUsername(data.username);
    if (usernameCheck) throw new ConflictException('Username already taken.');

    const user: UserCreate = {
      username: data.username,
      email: data.email,
      password: data.password,
      type: UserType.COMPANY,
      verifiedStatus: VerifiedStatus.UNVERIFIED,
    };

    const createUser = await this.userService.createUser(user);
    const company = Object.assign(new Company(), {
      userId: createUser.id,
      name: data.name,
      logo: data.logo,
      contact_details: data.contact_details,
      address: data.address,
      types: data.types,
      categories: data.categories,
      position: data.position,
      status: UserStatus.ACTIVE,
    });

    await this.companyService.createCompany(company);

    return HttpStatus.CREATED;
  }
}
