import { loginOpts, registerOpts } from '@src/context/types/user';
import { API_URL } from '@src/utils/url';
import axios from 'axios';

const userService = {
  login({ options }: { options: loginOpts }) {
    return axios({
      method: 'POST',
      url: `${API_URL}/api/users/login`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: options,
    });
  },

  logout() {
    return axios({
      method: 'GET',
      url: `${API_URL}/api/users/logout`,
      headers: {
        'Content-Type': 'application/json',
      },
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
    });
  },
  register({ options }: { options: registerOpts }) {
    return axios({
      method: 'POST',
      url: `${API_URL}/api/users/register`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: options,
    });
  },
};

export default userService;
