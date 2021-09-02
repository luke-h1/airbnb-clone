import { getBoundsOfDistance } from 'geolib';
import {
  Ctx, Field, Float, Int, ObjectType,
} from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  getConnection,
} from 'typeorm';
import { Context } from 'vm';
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
  userId!: string;

  @Field(() => Float)
  latitude!: number;

  @Field(() => Float)
  longitude!: number;

  @Field(() => [Listing])
  async nearby(@Ctx() ctx: Context) {
    const bounds = getBoundsOfDistance(
      { latitude: this.latitude, longitude: this.longitude },
      10000, // 10km
    );
    /*
    bounds array shape:
    [
      {latitude: 10, longitude: 20},
      {latitude: 10, longitude: 20}
    ]

    */

    // return ctx.prisma.listing.findMany({
    //   where: {
    //     latitude: { gte: bounds[0].latitude, lte: bounds[1].latitude },
    //     longitude: { gte: bounds[0].longitude, lte: bounds[1].longitude },
    //     id: { not: { equals: this.id } },
    //   },
    //   take: 25, // return 25
    // });
  }

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
