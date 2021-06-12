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

  @Field(() => String)
  @ManyToOne(() => User, (user) => user)
  @Column()
  user: User;

  @Field(() => String)
  @CreateDateColumn()
  @Column()
  createdAt: Date;

  @Field(() => Property)
  @Column()
  @ManyToOne(() => Property, (prop) => prop)
  property: Property;

  @Field(() => Int)
  @Column()
  @JoinColumn({ referencedColumnName: 'id' })
  @ManyToOne(() => Property, (prop) => prop.id)
  propertyId: number;

  @Field(() => String)
  @UpdateDateColumn()
  @Column()
  updatedAt: Date;
}
