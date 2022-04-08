import { UserType } from '@core/enum';
import { UserCreate } from '@core/interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    //
  }

  async checkEmailExist(email: string) {
    return this.userRepository.findOne({
      email,
    });
  }

  async checkUsername(username: string) {
    return this.userRepository.findOne({
      username,
    });
  }

  private _hashPassword(password: string, salt: string) {
    return bcrypt.hashSync(password, salt);
  }

  async createUser(data: UserCreate) {
    const salt = bcrypt.genSaltSync(10);
    const user = Object.assign(new User(), {
      ...data,
      type: UserType[data.type],
      salt,
      password: this._hashPassword(data.password, salt),
    });

    return await this.userRepository.save(user);
  }
}
