<template>
  <div class="row justify-center">
    <q-card flat class="q-pa-md q-ma-md col-12 col-md-5 bi-border">
      <div
        ref="messageContainer"
        class="message-container"
        style="flex: 1; overflow-y: auto"
      >
        <div v-for="message in chatStore.messages" :key="message.id">
          <q-chat-message
            text-color="white"
            bg-color="primary"
            class="q-pa-sm"
            size="9"
            sent
            v-if="message.assistant"
          >
            <template v-slot:name>Lexi</template>
            <template v-slot:avatar>
              <q-icon
                name="mdi-robot-excited-outline"
                class="q-message-avatar q-message-avatar--sent text-h4 text-primary rounded-borders"
              />
            </template>
            <div>{{ message.body }}</div>
          </q-chat-message>
          <q-chat-message bg-color="secondary" class="q-pa-sm" size="10" v-else>
            <template v-slot:name></template>
            <template v-slot:avatar>
              <q-icon
                name="mdi-account-school-outline"
                class="q-message-avatar q-message-avatar--sent text-h4 text-primary rounded-borders"
              />
            </template>
            <div>{{ message.body }}</div>
          </q-chat-message>
        </div>
      </div>
    </q-card>
  </div>
</template>

<script setup>
import { watch, ref, nextTick } from "vue";
import { useChatStore } from "stores/chat_store";

const chatStore = useChatStore();
const messageContainer = ref(null);

const scrollToBottom = () => {
  nextTick(() => {
    if (messageContainer.value) {
      messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
    }
  });
};

watch(
  () => chatStore.messages,
  () => {
    scrollToBottom();
  },
  { deep: true }
);
</script>
