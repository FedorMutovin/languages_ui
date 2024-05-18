import api from "./index";

export const apiServices = {
  languages: {
    index: () => api.get(`public/languages`),
  },
  registrations: {
    create: (data) => api.post(`signup`, data),
  },
  sessions: {
    create: (data) => api.post(`login`, data),
    destroy: () => api.delete(`logout`),
  },
  account_learning_languages: {
    create: (data) => api.post(`account/account_learning_languages`, data),
  },
};

export default apiServices;
