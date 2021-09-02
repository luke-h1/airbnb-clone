import { Field, Int, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CoordiantesInput } from '../resolvers/listing/inputs/CoordinatesInput';

@ObjectType()
@Entity('listings')
export class Listing extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column('varchar', { length: 50 })
  address: string;

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
  bedrooms: number;

  @Field(() => CoordiantesInput)
  @Column()
  coordinates: CoordiantesInput;

  @Field(() => String)
  @Column()
  description!: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
