// src/utils/tokenRefresh.js
import store from '../app/store';
import { refreshAccessToken } from '../features/login/authSlice';
import axios from 'axios';

export const apiWithAutoRefresh = async (config) => {
  const state = store.getState();
  const accessToken = state.Auth.accessToken;

  try {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await axios(config);
    return response;
  } catch (error) {
    if (error.response?.status === 401) {
      try {
        const refreshRes = await axios.post(
          'https://api.aaserzypher.dev/life-organized/refresh',
          {},
          { withCredentials: true }
        );

        const newToken = refreshRes.data.token;
        store.dispatch(refreshAccessToken(newToken));

        config.headers.Authorization = `Bearer ${newToken}`;
        return await axios(config);
      } catch (refreshError) {
        console.error('Refresh failed:', refreshError);
        throw refreshError;
      }
    } else {
      throw error;
    }
  }
};
export default apiWithAutoRefresh;
