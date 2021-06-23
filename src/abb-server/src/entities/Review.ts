import 'reflect-metadata';
import { Field, Int, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';

@ObjectType()
@Entity('reviews')
export class Review extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => Int)
  creatorId: number

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.reviews)
  @JoinColumn({ name: 'creatorId' })

  creator: User;

  @Field(() => String)
  @Column('varchar', { length: '40' })
  title: string;

  @Field(() => String)
  @Column('varchar', { length: '360' })
  body: string;
}
