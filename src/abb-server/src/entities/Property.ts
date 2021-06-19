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
  @Column('varchar', { length: 30 })
  title: string;

  @Field(() => Int)
  @Column()
  userId: number;

  @Field(() => User)
  @ManyToOne(() => User, user => user.properties)
  @JoinColumn({ name: 'userId' })
  user: User;

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
  @Column('text', { array: true })
  amenities: string[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
