import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

// modules
import { UserModule } from '@module/user/user.module';
import { CompanyModule } from '@module/company/company.module';

@Module({
  imports: [UserModule, CompanyModule],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
