import { getConnection } from 'typeorm';
import bcrypt from 'bcryptjs';
import { User } from '../entities/User';

export const seedDatabase = async () => {
  const userExists = await getConnection().query(
    `
    SELECT u.* FROM "users" u 
    WHERE u.email = $1
  `,
    ['bob@test.com'],
  );

  if (!userExists) {
    const hashedPassword = await bcrypt.hash('testpassword', 12);
    const result = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        firstName: 'bob',
        lastName: 'test',
        email: 'bob@test.com',
        password: hashedPassword,
        image:
          'https://images.unsplash.com/photo-1535585105038-bf206e97d068?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2700&q=80',
        imageFileName: 'testing',
      })
      .returning('*')
      .execute();
    const user = result.raw[0];
    console.log('bob the test user has been created 😃', user);
  }
  console.log('test user already exists');
};
