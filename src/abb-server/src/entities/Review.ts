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
import { Property } from './Property';
import { User } from './User';

@ObjectType()
@Entity('reviews')
export class Review extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => Int)
  @Column()
  creatorId: number;

  @Field(() => Int)
  @Column()
  propertyId: number;

  @Field(() => Property)
  @ManyToOne(() => Property, (property) => property.reviews)
  @JoinColumn({ name: 'propertyId' })
  property: User;

  @Field(() => User)
  @ManyToOne(() => User, (property) => property.reviews)
  @JoinColumn({ name: 'creatorId' })
  creator: User;

  @Field(() => String)
  @Column('varchar', { length: '40' })
  title: string;

  @Field(() => String)
  @Column('varchar', { length: '360' })
  body: string;
}
