import axios from 'axios';

const frontendApi = axios.create({
  baseURL:
    process.env.NODE_ENV !== 'development' ? '' : 'http://localhost:3000',
});
export default frontendApi;
