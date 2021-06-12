import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Property } from './Property';

@ObjectType()
@Entity('propertyImages')
export class PropertyImages extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => [String])
  @Column('text', { array: true })
  @OneToMany(() => Property, (prop) => prop.images)
  images: string[];

  @Field(() => String)
  @Column({ nullable: true })
  caption: string;
}
