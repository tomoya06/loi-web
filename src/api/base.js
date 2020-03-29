import axios from 'axios';

axios.defaults.withCredentials = true;

const Instance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:8080',
});

export default Instance;
