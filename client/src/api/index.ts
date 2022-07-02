import axios from 'axios';

const API_ENDPOINT = process.env.NODE_ENV === 'development' ? 'http://localhost:5000/api' : 'api';

const get = async (url: string) => {
  const { data } = await axios.get(`${API_ENDPOINT}${url}`, {
    withCredentials: true,
  });
  return data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const post = async (url: string, dataToSend: Record<any, any>) => {
  const { data } = await axios.post(`${API_ENDPOINT}${url}`, dataToSend, {
    withCredentials: true,
  });
  return data;
};

export const api = { get, post };
