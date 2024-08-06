import axios from 'axios'
import { LOCAL_STORAGE_KEYS } from '@/common/constants';
import { BACKEND_BASE_URL } from './app.config';

// this is the API used to handle user logins and registrations

const axiosClient = axios.create({
  headers: {
  'Content-Type': 'application/json',
  // 'Accept': 'application/json',
  },
    baseURL: BACKEND_BASE_URL
});

// axiosClient.defaults.headers = {
//   'Content-Type': 'application/json',
//   'Accept': 'application/json',
// };

//All request will wait 6 seconds before timeout
axiosClient.defaults.timeout = 45000;

// axiosClient.defaults.withCredentials = true;

axiosClient.interceptors.request.use(
  async (config) => {
    try {
        const accessToken = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
        if (accessToken) {
          if (config.headers) config.headers.Authorization = `Bearer ${accessToken}`;
        }
    } catch (error) {
      console.error(error)
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;