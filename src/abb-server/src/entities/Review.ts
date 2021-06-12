import { Field, Int, ObjectType } from 'type-graphql';
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
import { Property } from './Property';
import { User } from './User';

@ObjectType()
@Entity('reviews')
export class Review extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column('varchar', { length: 255 })
  reviewDescription: string;

  @Field(() => String)
  @Column()
  rating: string;

  @Field(() => Int)
  @Column()
  creatorId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.reviews)
  @JoinColumn({ name: 'creatorId' })
  creator: User;

  @Field(() => Int)
  @CreateDateColumn()
  @Column()
  createdAt: Date;

  @Field(() => String)
  @Column()
  propertyReviews: string;

  @Field(() => Property)
  // @Column()
  @ManyToOne(() => Property, (prop) => prop)
  @JoinColumn({ name: 'propertyReviews' })
  property: Property;

  @Field(() => Int)
  @Column()
  PropertyId: number;

  @Field(() => Int)
  @Column()
  @JoinColumn({ name: 'PropertyId' })
  @ManyToOne(() => Property, (prop) => prop.id)
  propertyId: number;

  @Field(() => Int)
  @UpdateDateColumn()
  @Column()
  updatedAt: Date;
}