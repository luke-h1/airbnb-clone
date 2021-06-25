import { InputType, Field } from 'type-graphql';

@InputType()
export class UsernamePasswordInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
