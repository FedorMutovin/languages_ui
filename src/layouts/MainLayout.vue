<template>
  <q-layout view="hHr lpR lFr">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>Learning Languages</q-toolbar-title>
        <q-space />
        <AccountSettings />
      </q-toolbar>
    </q-header>

    <q-drawer
      overlay
      behavior="desktop"
      v-model="leftDrawerOpen"
      side="left"
      bordered
    >
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
      <ChatWindow />
    </q-page-container>
    <q-footer class="bg-transparent text-white">
      <ChatMode />
      <MessageInput class="bg-white" />
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref, provide } from "vue";
import { onMounted, onBeforeUnmount } from "vue";
import { useWebSocketStore } from "stores/websocket_store";
import ChatWindow from "components/account/ChatWindow.vue";
import MessageInput from "components/account/MessageInput.vue";
import AccountSettings from "components/account/AccountSettings.vue";
import MessagesChannel from "src/channels/messages";
import { useChatStore } from "stores/chat_store";
import ChatMode from "components/account/ChatMode.vue";

const chatStore = useChatStore();
const leftDrawerOpen = ref(false);
const messageChannel = ref(null);
const webSocketStore = useWebSocketStore();
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

onMounted(async () => {
  await webSocketStore.connect();
  messageChannel.value = await webSocketStore.subscribeToChannel(
    new MessagesChannel()
  );
  messageChannel.value.on("message", (message) => {
    chatStore.appendMessages(message);
  });
});

onBeforeUnmount(() => {
  webSocketStore.disconnect();
});

provide("messageChannel", messageChannel);
</script>
