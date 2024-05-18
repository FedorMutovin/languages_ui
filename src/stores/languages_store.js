import { defineStore } from "pinia";
import { apiServices } from "src/utils/api/services";

export const useLanguagesStore = defineStore("LanguagesStore", {
  state: () => {
    return {
      for_interface: [],
      for_learning: [],
    };
  },
  actions: {
    async getAllLanguages() {
      try {
        const response = await apiServices.languages.index();
        this.for_interface = response.data.filter((lang) => lang.for_interface);
        this.for_learning = response.data.filter((lang) => lang.for_learning);
      } catch (error) {
        console.error("Failed to fetch languages:", error);
        throw error;
      }
    },

    findLanguageIdByLocale(locale) {
      const language = this.for_interface.find(
        (lang) => lang.locale === locale
      );
      return language ? language.id : null;
    },

    getFlagCodeByLocale(locale) {
      if (locale === "en") {
        return "gb";
      } else {
        return locale;
      }
    },
  },
});
