import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './User';

@Entity('properties')
export class Property extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar', { length: 30 })
  title: string;

  @Column()
  creatorId: number;

  @ManyToOne(() => User, (u) => u.properties)
  @JoinColumn({ name: 'creatorId' })
  creator: User;

  @Column('varchar', { length: 30 })
  propertyType: string;

  @Column()
  image: string;

  @Column()
  description!: string;

  @Column()
  pricePerNight: number;

  @Column('varchar', { length: 50 })
  address: string;

  @Column('text', { array: true })
  amenities: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
