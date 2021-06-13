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

  @Field(() => String)
  @Column()
  lastName!: string;

  @Column()
  password!: string;

  @Field(() => [Property])
  @Column('jsonb', { array: true, nullable: true })
  @OneToMany(() => Property, (p) => p.host)
  properties: Property[];

  @Field(() => [Review])
  @OneToMany(() => Review, (r) => r.reviewer)
  @Column('jsonb', { array: true, nullable: true })
  reviews: Review[];

  @Field(() => String)
  @CreateDateColumn()
  @Column()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  @Column()
  updatedAt: Date;
}
