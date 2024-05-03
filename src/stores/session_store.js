import { defineStore } from "pinia";

export const useSessionStore = defineStore("SessionStore", {
  state: () => {
    return {
      token: "",
    };
  },
  actions: {
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
