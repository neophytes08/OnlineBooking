import { UserStatus, UserType } from '@core/enum';
import { UserCreate } from '@core/interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { ObjectID, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Company } from '@module/company/entities/company.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
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

  async getUserLogin(email: string, isEmail: boolean) {
    if (isEmail) {
      return await this.getUserEmailActive(email);
    } else {
      return await this.getUsernameActive(email);
    }
  }

  async getUserEmailActive(email: string) {
    const user = await this.userRepository.findOne({
      relations: ['company'],
      where: {
        email,
      },
    });

    if (!user) return false;
    const company = await this.getCompany(user.id, UserStatus.ACTIVE);

    if (company) {
      return user;
    }

    return false;
  }

  async getUsernameActive(username: string) {
    const user = await this.userRepository.findOne({
      where: {
        username,
      },
    });

    if (!user) return false;
    const company = await this.getCompany(user.id, UserStatus.ACTIVE);

    if (company) {
      return user;
    }

    return false;
  }

  async getCompany(userId: ObjectID, status: UserStatus) {
    return await this.companyRepository.findOne({
      where: {
        userId,
        status,
      },
    });
  }
}
