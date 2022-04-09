import { IsNotEmpty } from 'class-validator';

export class ActivityCreateDto {
  @IsNotEmpty()
  ownerId: string;

  @IsNotEmpty()
  editorId: string;

  @IsNotEmpty()
  origin: string;

  @IsNotEmpty()
  details: string;
}
