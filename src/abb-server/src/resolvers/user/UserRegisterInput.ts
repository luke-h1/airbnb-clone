import { InputType, Field } from 'type-graphql';

@InputType()
export class UserRegisterInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  picture: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
