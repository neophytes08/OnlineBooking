import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppController } from './app.controller';
import { AuthModule } from '@module/auth/auth.module';
import { config as ormConfig } from './ormconfig';
import { UserModule } from '@module/user/user.module';
import { CompanyModule } from '@module/company/company.module';
import { ActivityModule } from '@module/activity/activity.module';
import { EventListenerModule } from '@core/event';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot(ormConfig),
    EventEmitterModule.forRoot(),
    UserModule,
    CompanyModule,
    ActivityModule,
    EventListenerModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
