import { UserStatus } from '@core/enum';
import { Address, ContactDetails } from '@core/interface';
import { User } from '@module/user/entities/user.entity';
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

@Entity('company')
export class Company {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  logo: string;

  @Column({ type: 'json' })
  contact_details: ContactDetails;

  @Column({ type: 'json' })
  address: Address;

  @Column({ type: 'array' })
  types: string;

  @Column({ type: 'array' })
  categories: string;

  @Column({ type: 'point' })
  position: any;

  @Column()
  status: UserStatus;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  /*
   * Relationships
   */

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
