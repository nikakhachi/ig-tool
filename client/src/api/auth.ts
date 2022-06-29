import { api, ServerResponseType } from '.';
import { UserType } from '../types/User';

const validateUser = () =>
  api.get('/v1/auth/validate-user') as Promise<
    Omit<ServerResponseType, 'data'> & {
      data: UserType;
      message: undefined;
    }
  >;

const signIn = (username: string, password: string) =>
  api.post('/v1/auth/sign-in', { username, password }) as Promise<
    Omit<ServerResponseType, 'message'> & {
      data: undefined;
      message: string;
    }
  >;

export const AuthApi = {
  validateUser,
  signIn,
};
