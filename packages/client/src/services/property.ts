import { createPropertyOpts, updatePropertyOpts } from '@src/context/types/property';
import { API_URL } from '@src/utils/url';
import axios from 'axios';

const propertyService = {
  getProperties() {
    return axios({
      method: 'GET',
      url: `${API_URL}/api/properties`,
      headers: {
        'Content-Type': 'application/json',
      },
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
    });
  },
  getProperty({ id }: { id: number }) {
    return axios({
      method: 'GET',
      url: `${API_URL}/api/properties/${id}`,
      headers: {
        'Content-Type': 'application/json',
      },
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
    });
  },
};
export default propertyService;
