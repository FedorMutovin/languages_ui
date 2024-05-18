<template>
  <div class="row justify-center">
    <div class="q-pa-md col-12 col-md-7">
      <q-input
        rounded
        outlined
        autogrow
        placeholder="Write something"
        v-model="messageBody"
        @keyup.enter="sendMessage"
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

const chatStore = useChatStore();
const messageChannel = inject("messageChannel");
const messageBody = ref("");
const { loading } = useDefaultData();

const sendMessage = () => {
  if (messageChannel) {
    const request = {
      message: messageBody.value,
      request: chatStore.mode,
      source_language: chatStore.source_language,
      target_language: chatStore.target_language,
    };

    messageChannel.value.speak(request);
    messageBody.value = "";
  } else {
    console.error("No channel no message");
  }
};
</script>
