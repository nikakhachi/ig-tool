import { api } from '.';

const getConnectionsByDays = () => api.get('/v1/user/connections-by-days');

export const DataApi = {
  getConnectionsByDays,
};
