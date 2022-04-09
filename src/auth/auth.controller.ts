import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { isEmail } from 'class-validator';
import { JwtService } from '@nestjs/jwt';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { UserCreate, VerifiedStatus } from '@core/interface';
import { EnvType, UserActivity, UserStatus, UserType } from '@core/enum';

import { UserService } from '@module/user/user.service';
import { CompanyService } from '@module/company/company.service';

import { Company } from '@module/company/entities/company.entity';
import { CompanyCreate } from './dto/company.create.dto';
import { LoginDto, LoginResDto } from './dto/login.dto';

@Controller({ path: 'auth', version: 'v1' })
export class AuthController {
  constructor(
    private userService: UserService,
    private companyService: CompanyService,
    private jwtService: JwtService,
    private eventEmitter: EventEmitter2,
  ) {
    //
  }

  @Post('login')
  @HttpCode(200)
  async getLogin(@Body() data: LoginDto): Promise<LoginResDto> {
    const user = await this.userService.getUserLogin(
      data.email,
      isEmail(data.email),
    );

    if (!user) throw new UnauthorizedException('Invalid Credentials');
    if (user.verifiedStatus === UserStatus.UNVERIFIED)
      throw new UnauthorizedException(
        'Account is not verified. Verify your account by checking to your email account.',
      );
    // const refreshJWTToken = this.jwtService.sign(
    //   {},
    //   {
    //     secret: process.env.JWT_SECRET,
    //     expiresIn: '1m',
    //   },
    // );

    // to do refresh token creation
    // const encryptedToken = encrypt(
    //   refreshJWTToken,
    //   this.secretManagerRT.rtCryptoEncryptionKey,
    // );
    // const refreshToken = `${encryptedToken.iv}.${encryptedToken.content}`;

    // await this.refTokenService.createRefreshToken(
    //   user.id,
    //   device && device.ipAddress === ipAddress ? device.id : null,
    //   refreshToken,
    //   from,
    // );

    this.eventEmitter.emit('login.success', {
      activity: {
        ownerId: user.id,
        editorId: user.id,
        origin: 'WEB',
        details: UserActivity.LOGIN,
      },
    });

    return {
      accessToken: this.jwtService.sign({
        id: user.id,
        email: user.email,
        type: user.type,
        env: process.env.NODE_ENV || EnvType.DEV,
      }),
    };
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
