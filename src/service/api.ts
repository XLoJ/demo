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

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    const response = err.response;
    if (response) {
      const data = response.data;
      if (data && data.message && typeof data.message === 'string') {
        err.message = data.message;
      }
    }
    return Promise.reject(err);
  }
);

export function downloadFile(
  filename: string,
  url: string,
  query: Record<string, string> = {}
) {
  return api({
    url,
    params: { ...query },
    method: 'GET',
    responseType: 'blob'
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename); //or any other extension
    document.body.appendChild(link);
    link.click();
  });
}
