import {
  registerDecorator,
  ValidationOptions,
  minLength,
  maxLength,
} from 'class-validator';

export function IsValidPassword(
  min = 8,
  max = 64,
  validationOptions?: ValidationOptions,
) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'IsValidPassword',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          const isValidLength = minLength(value, min) && maxLength(value, max);
          const isValidFormat =
            /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])(?=.*[!@#$%^&*]).*$/.test(
              value,
            );

          return isValidLength && isValidFormat;
        },

        defaultMessage() {
          return 'password is too weak';
        },
      },
    });
  };
}
