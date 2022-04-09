import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { format } from 'date-fns';
import { ActivityCreateDto } from './dto/activity.create.dto';
import { Activity } from './entities/activity.entity';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
  ) {
    //
  }

  async createActivity(data: ActivityCreateDto) {
    const { ownerId, editorId, origin, details } = data;
    const activity = Object.assign(new Activity(), {
      ownerId,
      editorId,
      origin,
      details,
      createDate: format(Date.now(), 'yyyy/MM/dd hh:mm:ss aa'),
    });

    return await this.activityRepository.save(activity);
  }
}
