import axios from 'axios';

export const post = (url, data) => {
  return axios.post(url, data);
};

export const get = (url) => {
  return axios.get(url);
};
