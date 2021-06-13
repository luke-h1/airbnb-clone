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
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column('varchar', { length: 30 })
  title: string;

  @Field(() => User)
  @Column('varchar', { length: 255 })
  @ManyToOne(() => User, (user) => user.id)
  host: User;

  @Field(() => Int)
  @Column()
  propertyId: number;

  @Field(() => User)
  @ManyToOne(() => Review, (r) => r.PropertyId)
  @JoinColumn({ name: 'propertyId' })
  reviews: Review;

  @Field()
  @Column('varchar', { length: 30 })
  propertyType: string;

  @Field(() => String)
  @Column()
  mainImage: string;

  @Field()
  @Column('double precision')
  latitude: number;

  @Field()
  @Column('double precision')
  longitude: number;

  @Field(() => [String])
  @Column('jsonb', { array: true })
  amenities: string[];

  @Field(() => String)
  @CreateDateColumn()
  @Column()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  @Column()
  updatedAt: Date;
}
