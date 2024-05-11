import { defineStore } from "pinia";
import { useApi } from "components/use/api";

export const useLanguageAssistantStore = defineStore("LanguageAssistantStore", {
  state: () => {
    return {
      message_history_id: "",
      messages: [],
    };
  },
  actions: {
    async getHistory() {
      const { api } = useApi();
      try {
        const response = await api.language_assistant.message_history();
        this.messages = response.data.messages;
        this.message_history_id = response.data.id;
      } catch (error) {
        console.error("Failed to fetch messages:", error);
        throw error;
      }
    },

    async appendMessage(data) {
      this.messages.push(data);
    },

    async sendMessage(messageBody) {
      const { api } = useApi();
      const message = {
        message: {
          body: messageBody,
          message_history_id: this.message_history_id,
        },
      };

      try {
        const response = await api.language_assistant.create_message(message);
        await this.appendMessage(response.data);
        return response;
      } catch (error) {
        console.error("Failed to send message:", error);
        throw error;
      }
    },
  },
});
