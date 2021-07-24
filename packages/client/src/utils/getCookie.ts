export const getCookie = () => {
  // @ts-ignore
  return document!.cookie
    .split('; ')
    .find((row) => row.startsWith('connect-sid='))
    .split('=')[1];
};
