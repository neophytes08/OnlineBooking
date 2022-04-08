import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Address, ContactDetails } from '@core/interface';
import { IsEmailUnique, IsValidPassword, Match } from '@core/decorator';

export class CompanyCreate {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MinLength(6)
  @MaxLength(40)
  @IsEmailUnique({
    message: 'Email address already exists',
  })
  email: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsString()
  @IsNotEmpty()
  @IsValidPassword()
  password: string;

  @Match('password', { message: "Password and Confirm password doesn't match" })
  confirmPassword: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  logo?: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ContactDetails)
  contact_details: ContactDetails;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Address)
  address: Address;

  @IsNotEmpty()
  @IsArray()
  types: string;

  @IsNotEmpty()
  @IsArray()
  categories: string;

  @IsNotEmpty()
  position: any;
}
