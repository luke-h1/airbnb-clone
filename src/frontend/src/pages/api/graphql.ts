import 'reflect-metadata';
import { NextApiRequest } from 'next';
import { ApolloServer } from 'apollo-server-micro';
import { schema } from '@frontend/src/schema';
import { Context } from '@frontend/src/schema/context';
import { prisma } from '@frontend/src/prisma';
import { loadIdToken } from '@frontend/src/auth/firebaseAdmin';

const server = new ApolloServer({
  schema,
  context: async ({ req }: { req: NextApiRequest }): Promise<Context> => {
    const uid = await loadIdToken(req);
    return {
      uid,
      prisma,
    };
  },
  tracing: true,
  playground: process.env.NODE_ENV !== 'production',
});

const handler = server.createHandler({ path: '/api/graphql' });

export const config = {
  api: {
    bodyParser: false,
  },
};
export default handler;
