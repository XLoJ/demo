import axios from 'axios';
import { getItem } from './store';
import { AccessTokenKey } from './constant';

export const api = axios.create({
  baseURL: 'http://localhost:3000'
});

api.interceptors.request.use((config) => {
  const token = getItem(AccessTokenKey);
  if (token) {
    config.headers['Authorization'] = token;
  }
  return config;
});
