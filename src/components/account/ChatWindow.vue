<template>
  <div class="row justify-center">
    <q-card flat class="q-pa-md q-ma-md col-12 col-md-7 bi-border">
      <div v-for="message in chatStore.messages" :key="message.id">
        <q-chat-message
          text-color="white"
          bg-color="primary"
          class="q-pa-sm"
          size="9"
          sent
          text-html
          :text="[message.body]"
          v-if="message.assistant"
        >
          <template v-slot:name>Lexi</template>
          <template v-slot:avatar>
            <q-icon
              name="mdi-robot-excited-outline"
              class="q-message-avatar q-message-avatar--sent text-h4 text-primary rounded-borders"
            />
          </template>
        </q-chat-message>
        <q-chat-message bg-color="secondary" class="q-pa-sm" size="10" :text="[message.body]" v-else>
          <template v-slot:name>Me</template>
          <template v-slot:avatar>
            <q-icon
              name="mdi-account-school-outline"
              class="q-message-avatar q-message-avatar--sent text-h4 text-primary rounded-borders"
            />
          </template>
        </q-chat-message>
      </div>
      <div ref="bottom"></div>
    </q-card>
  </div>
</template>

<script setup>
import { watch, ref, onMounted, nextTick} from "vue";
import { useChatStore } from "stores/chat_store";

const chatStore = useChatStore();
const bottom = ref(null);

const scrollToBottom = () => {
  nextTick(() => {
    if (bottom.value) {
      bottom.value.scrollIntoView({ behavior: 'smooth' });
    }
  });
};

onMounted(() => {
  scrollToBottom();
});

watch(
  () => chatStore.messages.length,
  () => {
    scrollToBottom();
  }
);
</script>
