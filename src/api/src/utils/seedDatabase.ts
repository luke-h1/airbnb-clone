import { getConnection } from 'typeorm';
import { User } from '../entities/User';

export const seedDatabase = async () => {
  //   const userExists = await User.find({ where: { email: 'bob@test.com' } });

  const userExists = await getConnection().query(
    `
    SELECT u.* FROM "users" u 
    WHERE u.email = $1
  `,
    ['bob@test.com'],
  );

  if (userExists) {
    console.log('bob the test user already exists');
  }
  const user = await User.create({
    firstName: 'bob',
    lastName: 'test',
    email: 'bob@test.com',
    password: 'testpassword',
    image:
      'https://images.unsplash.com/photo-1535585105038-bf206e97d068?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2700&q=80',
    imageFileName: 'testing',
  });
  console.log('bob the test user has been created 😃', user);
};
