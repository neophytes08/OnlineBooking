import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  OneToMany,
  OneToOne,
  UpdateDateColumn,
} from 'typeorm';
import { UserType } from '@core/enum';
import { Company } from '@module/company/entities/company.entity';
import * as bcrypt from 'bcrypt';
import { classToPlain, Exclude } from 'class-transformer';
import { Activity } from '@module/activity/entities/activity.entity';

@Entity('user')
export class User {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  type: UserType;

  @Column()
  verifiedStatus: string;

  @Column()
  @Exclude()
  salt: string;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  // validations
  validatePassword(password: string): boolean {
    const hash = bcrypt.hashSync(password, this.salt);
    return hash === this.password;
  }

  /*
   * Relationships
   */

  @OneToOne(() => Company, (company) => company.user)
  company: Company;

  @OneToMany(() => Activity, (activity) => activity.owner, {
    cascade: ['insert', 'update', 'remove'],
  })
  owner?: Activity[];

  @OneToMany(() => Activity, (activity) => activity.editor, {
    cascade: ['insert', 'update', 'remove'],
  })
  editor?: Activity[];

  toJSON() {
    return classToPlain(this);
  }
}
