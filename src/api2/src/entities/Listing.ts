import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';

@Entity('listings')
export class Listing extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 50 })
  title: string;

  @Column()
  userId: number;

  @ManyToOne(() => User, (u) => u.listings, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column('varchar', { length: 30 })
  propertyType: string;

  @Column()
  image: string;

  @Column()
  imageFileName: string;

  @Column()
  beds: number;

  @Column()
  bedrooms: number;

  @Column()
  baths: number;

  @Column()
  pricePerNight: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
