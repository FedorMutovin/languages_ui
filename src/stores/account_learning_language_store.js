import { defineStore } from "pinia";

export const useAccountLearningLanguageStore = defineStore(
  "AccountLearningLanguageStore",
  {
    state: () => {
      return {
        id: "",
        language_id: "",
        account_id: "",
      };
    },
    actions: {
      setAccountLearningLanguage(AccountLearningLanguageData) {
        Object.assign(this, AccountLearningLanguageData);
      },
    },
    persist: true,
  }
);
