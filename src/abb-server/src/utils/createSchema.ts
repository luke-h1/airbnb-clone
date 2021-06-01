import { buildSchema } from 'type-graphql';

export const createSchema = async () => await buildSchema({
  resolvers: [`${__dirname}../resolvers/**/*.ts`],
  validate: false,
});
