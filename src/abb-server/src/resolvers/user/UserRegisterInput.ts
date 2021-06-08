import { InputType, Field } from 'type-graphql';

@InputType()
export class UserRegisterInput {
  @Field()
  FirstName: string;

  @Field()
  LastName: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
