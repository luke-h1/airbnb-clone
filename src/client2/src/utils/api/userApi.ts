import axios from 'axios';

const userApi = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'deployed'
      : 'http://localhost:5000/api/users',
  headers: {
    'Content-Type': 'application/json',
  },
});
export default userApi;
