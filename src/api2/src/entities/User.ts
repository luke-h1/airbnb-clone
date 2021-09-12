import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Listing } from './Listing';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email!: string;

  @Column()
  firstName: string;

  @Column()
  lastName!: string;

  @Column()
  password!: string;

  @OneToMany(() => Listing, (l) => l.user)
  listings: Listing[];

  @Column()
  image: string;

  @Column()
  imageFileName: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
