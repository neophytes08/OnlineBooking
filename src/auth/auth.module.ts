import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { isNumberString } from 'class-validator';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

// modules
import { UserModule } from '@module/user/user.module';
import { CompanyModule } from '@module/company/company.module';
import { ActivityModule } from '@module/activity/activity.module';

@Module({
  imports: [
    UserModule,
    CompanyModule,
    ActivityModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: isNumberString(process.env.JWT_EXPIRES)
          ? Number(process.env.JWT_EXPIRES)
          : process.env.JWT_EXPIRES,
      },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
