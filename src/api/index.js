import axios from 'axios'

const api = axios.create({ baseURL: process.env.API_URL })

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
  }
}
