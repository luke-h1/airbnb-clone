import axios from 'axios';

const baseApi = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'deployed url'
      : 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
export default baseApi;
