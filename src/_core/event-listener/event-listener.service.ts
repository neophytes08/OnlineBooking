import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ActivityService } from '@module/activity/activity.service';
import { LoginSuccess } from './interface';

@Injectable()
export class EventListenerService {
  constructor(private activityService: ActivityService) {
    //
  }

  /**
   * AUTH LOGIN
   */
  @OnEvent('login.success')
  async onLoginSuccessLogActivity(payload: LoginSuccess) {
    await this.activityService.createActivity(payload.activity);
  }
}
