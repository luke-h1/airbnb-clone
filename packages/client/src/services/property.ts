/* eslint-disable */
import axios from 'axios';
import { API_URL } from '../utils/url';
import { createPropertyOpts, updatePropertyOpts } from '../context/types/property';

const propertyService = {
  getProperties() {
    return axios({
      method: 'GET',
      url: `${API_URL}/api/properties`,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
  },
  createProperty({ options }: { options: createPropertyOpts }) {
    return axios({
      method: 'POST',
      url: `${API_URL}/api/properties`,
      headers: {
        'Content-Type': 'application/json',
        // get auth
      },
      withCredentials: true,
    });
  },
  updateProperty({ options, id }: { options: updatePropertyOpts, id: number }) {
    return axios({
      method: 'PUT',
      url: `${API_URL}/api/properties/${id}`,
      headers: {
        'Content-Type': 'application/json',
        // get auth
      },
      withCredentials: true,
    });
  },
  getProperty({ id }: { id: number }) {
    return axios({
      method: 'GET',
      url: `${API_URL}/api/properties/${id}`,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,

    });
  },
  deleteProperty({ id }: { id: number }) {
    return axios({
      method: 'DELETE',
      url: `${API_URL}/api/properties/${id}`,
      headers: {
        'Content-Type': 'application/json',
        // auth
      },
      withCredentials: true,
    });
  },
};
export default propertyService;
