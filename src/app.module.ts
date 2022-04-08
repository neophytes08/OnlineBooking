import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from '@module/auth/auth.module';
import { config as ormConfig } from './ormconfig';
import { UserModule } from '@module/user/user.module';
import { CompanyModule } from '@module/company/company.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot(ormConfig),
    UserModule,
    CompanyModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
