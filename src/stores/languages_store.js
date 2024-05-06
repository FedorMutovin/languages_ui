import { defineStore } from "pinia";
import { useApi } from 'components/mixins/use_api';

export const useLanguagesStore = defineStore("LanguagesStore", {
  state: () => {
    return {
      for_interface: [],
      for_learning: [],
    };
  },
  actions: {
    async getAllLanguages() {
      const { api } = useApi();
      try {
        const response = await api.languages.index();
        this.for_interface = response.data.filter(lang => lang.for_interface);
        this.for_learning = response.data.filter(lang => lang.for_learning);
      } catch (error) {
        console.error("Failed to fetch languages:", error);
        throw error;
      }
    },

    findLanguageIdByLocale(locale) {
      const language = this.for_interface.find(lang => lang.locale === locale);
      return language ? language.id : null;
    },

    getFlagCodeByLocale(locale) {
      if(locale === 'en') {
        return 'gb'
      } else {
        return locale
      }
    }
  },
});
