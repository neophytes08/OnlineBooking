import { IsNotEmpty, IsString, IsEmail, IsMobilePhone } from 'class-validator';

export class ContactDetails {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsMobilePhone()
  mobile: string;
}
