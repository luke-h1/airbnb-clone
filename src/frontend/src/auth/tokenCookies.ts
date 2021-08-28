import frontendApi from '@frontend/src/services/index';

export const setTokenCookie = (token: string) => {
  frontendApi.post('/api/login', JSON.stringify({ token }), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const removeTokenCookie = () => {
  frontendApi.post('/api/logout', JSON.stringify({}), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
