import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';
import { Activity } from './entities/activity.entity';
import { User } from '@module/user/entities/user.entity';
import { UserModule } from '@module/user/user.module';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Activity, User]), UserModule],
  providers: [ActivityService],
  controllers: [ActivityController],
  exports: [ActivityService, TypeOrmModule],
})
export class ActivityModule {}
