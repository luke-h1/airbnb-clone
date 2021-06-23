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
import { Review } from './Review';
import { User } from './User';

@ObjectType()
@Entity('properties')
export class Property extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column('varchar', { length: 30 })
  title: string;

  @Field(() => Int)
  @Column()
  creatorId: number;

  @ManyToOne(() => User, (u) => u.properties)
  @JoinColumn({ name: 'creatorId' })
  creator: User;

  @Field()
  @Column('varchar', { length: 30 })
  propertyType: string;

  @Field(() => String)
  @Column()
  mainImage: string;

  @Field(() => String)
  @Column()
  description!: string;

  @Field(() => Int)
  @Column()
  pricePerNight: number;

  @Field()
  @Column('double precision')
  latitude: number;

  @Field()
  @Column('double precision')
  longitude: number;

  @Field(() => [String])
  @Column('text', { array: true })
  amenities: string[];

  @Field(() => [Review], { nullable: true })
  @ManyToOne(() => Review, (review) => review.creator)
  reviews: Review[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
