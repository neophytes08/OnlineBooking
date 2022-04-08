import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CompanyService } from '@module/company/company.service';

@ApiTags('User')
@Controller({ path: 'user', version: 'v1' })
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly companyService: CompanyService,
  ) {
    //
  }
}
