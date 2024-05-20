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
      mini-to-overlay
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
import { ref, provide, onMounted, onBeforeUnmount } from "vue";
import { useWebSocketStore } from "stores/websocket_store";
import { useChatStore } from "stores/chat_store";
import { useAccountLearningLanguageStore } from "stores/account_learning_language_store";
import ChatWindow from "components/account/ChatWindow.vue";
import MessageInput from "components/account/MessageInput.vue";
import AccountSettings from "components/account/AccountSettings.vue";
import MessagesChannel from "src/channels/messages";
import ChatMode from "components/account/ChatMode.vue";

const chatStore = useChatStore();
const webSocketStore = useWebSocketStore();
const accountLearningLanguageStore = useAccountLearningLanguageStore();
const leftDrawerOpen = ref(false);
const messageChannel = ref(null);
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
  await accountLearningLanguageStore.getCurrent()
});

onBeforeUnmount(() => {
  webSocketStore.disconnect();
});

provide("messageChannel", messageChannel);
</script>
