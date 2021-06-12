import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PropertyImages } from './PropertyImages';
import { User } from './User';

@ObjectType()
@Entity('properties')
export class Property extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column('varchar', { length: 30 })
  title: string;

  @Field()
  @Column('varchar', { length: 25 })
  @ManyToOne(() => User, (user) => user.id)
  host: User;

  @Field()
  @Column('varchar', { length: 30 })
  propertyType: string;

  @Field(() => String)
  @Column()
  mainImage: string;

  @Field(() => [PropertyImages])
  @Column('varchar', { length: 25 })
  @ManyToOne(() => PropertyImages, (img) => img.images)
  images: PropertyImages[];

  @Field()
  @Column('double precision')
  latitude: number;

  @Field()
  @Column('double precision')
  longitude: number;

  @Field(() => [String])
  @Column('text', { array: true })
  amenities: string[];

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.properties)
  @Column()
  user: User;

  @Field(() => String)
  @CreateDateColumn()
  @Column()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  @Column()
  updatedAt: Date;
}
