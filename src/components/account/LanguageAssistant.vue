<template>
  <q-btn
    v-show="!showAssistantInterface"
    outline
    round
    color="white"
    text-color="primary"
    size="lg"
    icon="mdi-robot-excited-outline"
    @click="toggleAssistantInterface"
  />
  <q-card
    v-show="showAssistantInterface"
    class="q-pa-sm column flex"
    style="
      max-width: 400px;
      min-height: 550px;
      display: flex;
      flex-direction: column;
    "
  >
    <q-btn
      flat
      round
      icon="close"
      class="absolute-top-right q-ma-sm"
      @click="toggleAssistantInterface"
    />

    <div
      ref="messageContainer"
      style="flex: 1; overflow-y: auto; max-height: 450px"
    >
      <div v-for="message in assistantStore.messages" :key="message.id">
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
              class="q-message-avatar q-message-avatar--sent text-h6 text-primary rounded-borders"
            />
          </template>
          <div>{{ message.body }}</div>
        </q-chat-message>
        <q-chat-message bg-color="secondary" class="q-pa-sm" size="9" v-else>
          <template v-slot:name></template>
          <template v-slot:avatar>
            <q-icon
              name="mdi-account-school-outline"
              class="q-message-avatar q-message-avatar--sent text-h6 text-primary rounded-borders"
            />
          </template>
          <div>{{ message.body }}</div>
        </q-chat-message>
      </div>
    </div>

    <q-input
      rounded
      outlined
      v-model="messageBody"
      class="q-ma-md absolute-bottom"
    >
      <template v-slot:append>
        <q-btn
          :ripple="false"
          :disable="messageBody.length < 3"
          flat
          round
          color="primary"
          :loading="loading"
          icon="mdi-arrow-up-circle"
          @click="sendMessage"
        />
      </template>
    </q-input>
  </q-card>
</template>

<script setup>
import { onMounted, ref, watch, nextTick } from "vue";
import { useLanguageAssistantStore } from "stores/language_assistant_store";
import { useDefaultData } from "components/use/default_data";

const showAssistantInterface = ref(false);
const messageContainer = ref(null);
const messageBody = ref("");
const assistantStore = useLanguageAssistantStore();
const { loading } = useDefaultData();

onMounted(async () => {
  if (
    assistantStore.messages.length === 0 ||
    assistantStore.message_history_id === ""
  ) {
    await assistantStore.getHistory();
  }
});

const scrollToBottom = () => {
  nextTick(() => {
    if (messageContainer.value) {
      messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
    }
  });
};

watch(
  () => assistantStore.messages,
  () => {
    scrollToBottom();
  },
  { deep: true }
);

const sendMessage = async () => {
  loading.value = true;
  try {
    await assistantStore.sendMessage(messageBody.value);
    scrollToBottom();
    messageBody.value = "";
  } catch (error) {
    console.error("Failed to create message:", error);
    throw error;
  } finally {
    loading.value = false;
  }
};

const toggleAssistantInterface = () => {
  showAssistantInterface.value = !showAssistantInterface.value;
};
</script>
<style scoped>
.q-btn .q-focus-helper {
  display: none;
}
</style>
