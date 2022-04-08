import { IsNotEmpty, IsString, IsNumberString } from 'class-validator';

export class Position {
  @IsString()
  @IsNotEmpty()
  @IsNumberString()
  longitude: string;

  @IsString()
  @IsNotEmpty()
  @IsNumberString()
  latitude: string;
}
