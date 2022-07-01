import { api } from '.';
import { UserType } from 'serverTypes/main.types';

const validateUser = () =>
  api.get('/v1/auth/validate-user') as Promise<{
    path: string;
    status: number;
    data: UserType;
  }>;

const signIn = (username: string, password: string) =>
  api.post('/v1/auth/sign-in', { username, password }) as Promise<{
    path: string;
    status: number;
    message: string;
  }>;

export const AuthApi = {
  validateUser,
  signIn,
};
