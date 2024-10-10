import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const fetchProducts = () => {
  return axios.get(`${API_URL}/products`);
};