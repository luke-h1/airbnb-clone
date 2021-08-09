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
import { User } from './User';

@ObjectType()
@Entity('properties')
export class Property extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column('varchar', { length: 20 })
  title: string;

  @Field(() => Int)
  @Column()
  creatorId: number;

  @ManyToOne(() => User, (u) => u.properties)
  @JoinColumn({ name: 'creatorId' })
  creator: User;

  @Field()
  @Column('varchar', { length: 15 })
  propertyType: string;

  @Field(() => String)
  @Column()
  image: string;

  @Column()
  imageFileName: string;

  @Field(() => Int)
  @Column()
  beds: number;

  @Field(() => Int)
  @Column()
  baths: number;

  @Field(() => Int)
  @Column()
  bedrooms: number;

  @Field(() => String)
  @Column()
  description!: string;

  @Field(() => Int)
  @Column()
  pricePerNight: number;

  @Field()
  @Column('varchar', { length: 20 })
  address: string;

  @Field(() => [String])
  @Column('text', { array: true })
  amenities: string[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
