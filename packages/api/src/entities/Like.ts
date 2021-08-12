import { ObjectType } from 'type-graphql';
import {
  BaseEntity, Column, Entity, ManyToOne, PrimaryColumn,
} from 'typeorm';
import { Property } from './Property';
import { User } from './User';

@ObjectType()
@Entity()
export class Like extends BaseEntity {
  @Column({ type: 'int' })
  value: number;

  @PrimaryColumn()
  userId: number;

  @ManyToOne(() => User, (user) => user.likes)
  user: User;

  @PrimaryColumn()
  propertyId: number;

  @ManyToOne(() => Property, (property) => property.likes, {
    onDelete: 'CASCADE',
  })
  property: Property;
}
