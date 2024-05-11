import api from "./index";

export const apiServices = {
  languages: {
    index: () => api.get(`languages`),
  },
  registrations: {
    create: (data) => api.post(`signup`, data),
  },
  sessions: {
    create: (data) => api.post(`login`, data),
    destroy: () => api.delete(`logout`),
  },
  account_learning_languages: {
    create: (data) => api.post(`account_learning_languages`, data),
  },
  language_assistant: {
    message_history: () => api.get(`language_assistant/message_history`),
    create_message: (data) =>
      api.post(`language_assistant/create_message`, data),
  },
};

export default apiServices;
