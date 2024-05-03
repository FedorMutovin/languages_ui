import { defineStore } from "pinia";

export const useUserStore = defineStore("UserStore", {
  state: () => {
    return {
      id: "",
      email: "",
    };
  },
  actions: {
    setUser(userData) {
      Object.assign(this, userData);
    },
  },
  persist: true,
});
