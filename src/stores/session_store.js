import { defineStore } from "pinia";
import { apiServices } from "src/utils/api/services";

export const useSessionStore = defineStore("SessionStore", {
  state: () => {
    return {
      token: "",
    };
  },
  actions: {
    async create(data) {
      const response = await apiServices.sessions.create(data);
      this.token = response.headers.authorization.split(" ")[1];
      return response;
    },
    updateToken(token) {
      this.token = token;
    },
  },
  getters: {
    isAuthorized() {
      return !!this.token;
    },
  },
  persist: true,
});
