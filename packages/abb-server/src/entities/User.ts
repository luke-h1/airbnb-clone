import { Field, Int, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Property } from './Property';
import { Review } from './Review';

@ObjectType()
@Entity('users')
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column({ unique: true })
  email!: string;

  @Field(() => String)
  @Column()
  firstName!: string;

  @Field(() => String, { nullable: true })
  @Column()
  image?: string;

  @Field(() => String)
  @Column()
  lastName!: string;

  @Column()
  password!: string;

  @Field(() => [Property])
  @OneToMany(() => Property, (p) => p.creator)
  properties: Property[];

  @Field(() => [Review])
  @OneToMany(() => Review, (r) => r.creator)
  reviews: Review[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
