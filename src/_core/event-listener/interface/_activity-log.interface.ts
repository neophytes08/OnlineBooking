import { UserActivity } from '@core/enum';

export interface ActivityLog {
  ownerId: string;
  editorId: string;
  origin: string;
  details: UserActivity;
}
