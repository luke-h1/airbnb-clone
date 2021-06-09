import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
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
  @Column('text', { nullable: true })
  pictureUrl: string;

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
  @Column('double precision')
  latitude: number;

  @Field()
  @Column('double precision')
  longitude: number;

  @Field(() => [String])
  @Column('text', { array: true })
  amenities: string[];

  @Field()
  @Column('int')
  userId: number;

  @ManyToOne(() => User, (user) => user.listings)
  user: User;
}
