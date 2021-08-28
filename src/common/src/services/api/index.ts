import axios from 'axios';
import Client from './Client';

export const api = new Client(
  axios.create({
    baseURL:
      process.env.NODE_ENV !== 'development' ? '' : 'http://localhost:3000',
  }),
);
