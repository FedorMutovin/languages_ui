import { defineStore } from "pinia";
import { apiServices } from "src/utils/api/services";

export const useUserStore = defineStore("UserStore", {
  state: () => {
    return {
      id: "",
      email: "",
    };
  },
  actions: {
    async create(data) {
      const response = await apiServices.registrations.create(data);
      this.setUser(response.data);
      return response;
    },
    setUser(userData) {
      Object.assign(this, userData);
    },
  },
  persist: true,
});
