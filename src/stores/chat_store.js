import { defineStore } from "pinia";

export const useChatStore = defineStore("ChatStore", {
  state: () => {
    return {
      availableMods: ['Explain', 'Correct', 'Translate'],
      mode: "Explain",
      sourceLanguage: "English",
      targetLanguage: "Russian",
      messages: [],
    };
  },
  actions: {
    appendMessages(data) {
      if (!data || data.length === 0) {
        return;
      }

      if (Array.isArray(data)) {
        data.forEach((newMessage) => {
          if (!this.messages.some((message) => message.id === newMessage.id)) {
            this.messages.push(newMessage);
          }
        });
      } else {
        if (!this.messages.some((message) => message.id === data.id)) {
          this.messages.push(data);
        }
      }
    },
    reverseLanguages() {
      const targetLanguage = this.targetLanguage;
      this.targetLanguage = this.sourceLanguage
      this.sourceLanguage = targetLanguage;
    }
  },
});
