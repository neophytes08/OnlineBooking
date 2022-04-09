import { IsValidUsernameOrEmail } from '@core/decorator';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @IsValidUsernameOrEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class LoginResDto {
  accessToken: string;
}
