import axios from 'axios';
import { loginOpts, registerOpts } from '../context/types/user';
import { API_URL } from '../utils/url';

const userService = {
  login(options: loginOpts) {
    return axios({
      method: 'POST',
      url: `${API_URL}/api/users/login`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: options,
      withCredentials: true,
    });
  },

  logout() {
    return axios({
      method: 'GET',
      url: `${API_URL}/api/users/logout`,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
  },
  me() {
    return axios({
      method: 'GET',
      url: `${API_URL}/api/users`,
      headers: {
        'Content-Type': 'application/json',
        // TODO get auth
      },
      withCredentials: true,
    });
  },
  register(options: registerOpts) {
    return axios({
      method: 'POST',
      url: `${API_URL}/api/users/register`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: { options },
      withCredentials: true,
    });
  },
};

export default userService;
