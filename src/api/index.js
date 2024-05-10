import axios from 'axios';
import { i18n } from "boot/i18n";
import { Notify } from "quasar";
import { useUserStore } from "stores/user_store";
import { useSessionStore } from "stores/session_store";

const api = axios.create({
  baseURL: process.env.API_URL,
  headers: { "Content-Type": "application/json" }
});

api.interceptors.request.use(config => {
  const sessionStore = useSessionStore();
  if (sessionStore.token) {
    config.headers.Authorization = `Bearer ${sessionStore.token}`;
  }
  return config;
}, error => Promise.reject(error));

api.interceptors.response.use(response => response, error => {
  if (error.response && error.response.status === 401) {
    const sessionStore = useSessionStore();
    const userStore = useUserStore();
    sessionStore.$reset();
    userStore.$reset();
  }

  let message = i18n.global.t('errors.unexpected');
  if (error.response && error.response.data) {
    if (error.response.data.errors) {
      const errors = error.response.data.errors;
      message = Object.entries(errors).map(([key, value]) => `${key}: ${value}`).join(', ');
    } else {
      message = error.response.data;
    }
  }

  Notify.create({
    message: message,
    color: 'negative',
    icon: 'mdi-alert',
    position: 'top'
  });
  return Promise.reject(error);
});

export default api;
