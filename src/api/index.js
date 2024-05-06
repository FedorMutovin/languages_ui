import axios from 'axios'
import { useSessionStore } from 'stores/session_store';
import { useUserStore } from 'stores/user_store';

const api = axios.create({ baseURL: process.env.API_URL })

api.interceptors.request.use(
  (config) => {
    const sessionStore = useSessionStore();
    config.headers["Authorization"] = sessionStore.token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      const sessionStore = useSessionStore();
      const userStore = useUserStore();
      sessionStore.$reset();
      userStore.$reset();
    }
    return Promise.reject(error);
  },
);

api.defaults.headers.common["Content-Type"] = "application/json";

export default {
  languages: {
    index: () => api.get(`languages`),
  },
  registrations: {
    create: (data) => api.post(`signup`, data),
  },
  sessions: {
    create: (data) => api.post(`login`, data),
  },
  account_learning_languages: {
    create: (data) => api.post(`account_learning_languages`, data),
  }
}
