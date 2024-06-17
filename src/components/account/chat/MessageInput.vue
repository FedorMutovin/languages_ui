<template>
  <div class="row justify-center">
    <div class="q-pa-md col-12 col-md-7">
      <q-input
        rounded
        outlined
        autogrow
        :placeholder="$t('account.chat.message_input_placeholder')"
        v-model="messageBody"
        @keydown.enter.prevent="sendMessage"
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
    </div>
  </div>
</template>

<script setup>
import { inject, ref } from "vue";
import { useDefaultData } from "components/use/default_data";
import { useChatStore } from "stores/chat_store";
import { useUserStore } from "stores/user_store";

const chatStore = useChatStore();
const userStore = useUserStore();
const messageChannel = inject("messageChannel");
const messageBody = ref("");
const { loading } = useDefaultData();

const sendMessage = () => {
  if (messageChannel) {
    const data = {
      message: messageBody.value,
      request: chatStore.mode,
      user_id: userStore.id,
      source_language: chatStore.sourceLanguage,
      target_language: chatStore.targetLanguage,
    };

    messageChannel.value.perform('receive', { ...data });
    messageBody.value = "";
  } else {
    console.error("No channel no message");
  }
};
</script>
