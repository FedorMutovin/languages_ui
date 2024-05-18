import { defineStore } from "pinia";

export const useChatStore = defineStore("ChatStore", {
  state: () => {
    return {
      mode: "Translate",
      source_language: "English",
      target_language: "Russian",
      messages: [],
    };
  },
  actions: {
    appendMessages(data) {
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
  },
});
