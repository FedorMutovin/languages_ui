import { defineStore } from "pinia";
import { createCable } from "@anycable/web";
import { useSessionStore } from "stores/session_store";

export const useWebSocketStore = defineStore("WebSocketStore", {
  state: () => {
    return {
      cable: null,
    };
  },
  actions: {
    async connect() {
      try {
        const sessionStore = useSessionStore();
        this.cable = await createCable(
          `${process.env.CABLE_URL}?token=${sessionStore.token}`
        );
        await this.cable.connect();
      } catch (error) {
        console.error("connection error:", error);
        throw error;
      }
    },

    async subscribeToChannel(channelName, params) {
      const channel = this.cable.subscribeTo(channelName, params);
      await channel.ensureSubscribed();
      return channel;
    },

    async disconnect() {
      await this.cable.disconnect();
      console.log("disconnected");
    },
  },
});
