import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ObjectID,
  ObjectIdColumn,
  OneToOne,
  UpdateDateColumn,
} from 'typeorm';
import { UserType } from '@core/enum';
import { Company } from '@module/company/entities/company.entity';

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
  password: string;

  @Column()
  type: UserType;

  @Column()
  verifiedStatus: string;

  @Column()
  salt: string;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  /*
   * Relationships
   */

  @OneToOne(() => Company)
  @JoinColumn()
  company: Company;
}
