import { defineStore } from "pinia";
import { apiServices } from "src/utils/api/services";

export const useAccountLearningLanguageStore = defineStore(
  "AccountLearningLanguageStore",
  {
    state: () => {
      return {
        id: null,
        account_id: null,
        current: false,
        language: {}
      };
    },
    actions: {
      setAccountLearningLanguage(AccountLearningLanguageData) {
        Object.assign(this, AccountLearningLanguageData);
      },
      async getCurrent() {
        const response = await apiServices.account_learning_languages.current();
        this.setAccountLearningLanguage(response.data);
        return response;
      }
    },
    persist: true,
  }
);
