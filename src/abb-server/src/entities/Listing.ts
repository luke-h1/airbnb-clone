import { Field, ObjectType } from 'type-graphql';
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
@Entity('listings')
export class Listing extends BaseEntity {
  @PrimaryGeneratedColumn() id: string;

  @Field()
  @Column('varchar', { length: 100 })
  name!: string;

  @Field()
  @Column('varchar', { length: 100 })
  category: string;

  @Field()
  @Column('varchar', { length: 255 })
  description: string;

  @Field()
  @Column('int')
  price: number;

  @Field()
  @Column('int')
  beds: number;

  @Field()
  @Column('int')
  guests: number;

  @Field()
  @Column('varchar', { length: 30 })
  city: string;

  @Field()
  @Column('varchar', { length: 30 })
  country: string;

  @Field()
  @Column('varchar', { length: 60 })
  address: string;

  @Field(() => String)
  @Column('text')
  amenities: string;

  @Field()
  @Column('int')
  userId: number;

  @ManyToOne(() => User, (u) => u.listings)
  @JoinColumn({ name: 'creatorId' })
  creator: User;
}
