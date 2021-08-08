export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}
export type UserLocalStorage = {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  token: string;
};
