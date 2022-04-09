import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ObjectIdColumn,
  ObjectID,
} from 'typeorm';
import { User } from '@module/user/entities/user.entity';

@Entity('activity')
export class Activity {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  origin: string;

  @Column()
  details: string;

  @CreateDateColumn()
  createDate?: Date;

  @UpdateDateColumn()
  updateDate?: Date;

  /**
   * relationships
   */
  @ManyToOne(() => User, (user) => user.owner)
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  @ManyToOne(() => User, (user) => user.editor)
  @JoinColumn({ name: 'editorId' })
  editor: User;
}
