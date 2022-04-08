import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { getManager, In } from 'typeorm';
import { User } from '@module/user/entities/user.entity';
import { UserStatus } from '@core/enum';

@ValidatorConstraint({ async: true })
export class IsEmailUniqueConstraint implements ValidatorConstraintInterface {
  async validate(email: string) {
    const totalCompany = await getManager()
      .getRepository(User)
      .count({
        relations: ['company'],
        where: {
          email: email.toLowerCase(),
          company: {
            status: In([
              UserStatus.ACTIVE,
              UserStatus.DEACTIVATED,
              UserStatus.PENDING,
              UserStatus.VERIFIED,
            ]),
          },
        },
      });

    return totalCompany > 0 ? false : true;
  }
}

export function IsEmailUnique(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailUniqueConstraint,
    });
  };
}
