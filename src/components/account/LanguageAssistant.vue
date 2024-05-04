<template>
  <q-btn
    v-if="!showAssistantInterface"
    outline round color="white" text-color="primary"
    size="lg" icon="mdi-robot-excited-outline"
    @click="toggleAssistantInterface"
  />
  <q-card v-else class="q-pa-sm column justify-center">
    <q-btn flat round icon="close" class="absolute-top-right q-ma-sm" @click="toggleAssistantInterface" />

    <q-chat-message
      :text="[`Hi, I'm Lexi, your AI language assistant. Ready to dive into language learning? I can help with translations and grammar corrections. What would you like to explore first?`]"
      sent
      text-color="white"
      bg-color="primary"
      class="q-pa-md"
    >
      <template v-slot:name>Lexi</template>
      <template v-slot:avatar>
        <q-icon
          name="mdi-robot-excited-outline"
          class="q-message-avatar q-message-avatar--sent text-h6 text-primary rounded-borders"
        />
      </template>
    </q-chat-message>

    <q-chat-message
      bg-color="secondary"
      class="q-pa-md"
    >
      <template v-slot:name>Mary</template>
      <template v-slot:avatar>
        <q-icon
          name="mdi-account-school-outline"
          class="q-message-avatar q-message-avatar--sent text-h6 text-primary rounded-borders"
        />
      </template>
      <div>
        Already building an app with it...
      </div>
      <q-spinner-dots size="2rem" />
    </q-chat-message>

    <q-input rounded-filled outlined v-model="text" class="q-mt-md">
      <template v-slot:append>
        <q-btn-dropdown flat icon="more_vert" color="primary">
          <q-list>
            <q-item clickable v-close-popup @click="translateText">
              <q-item-section>Translate</q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="checkGrammar">
              <q-item-section>Check Grammar</q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </template>
    </q-input>
  </q-card>
</template>

<script setup>
import {ref} from 'vue';

const showAssistantInterface = ref(false);
const text = ref('');


const toggleAssistantInterface = () => {
  showAssistantInterface.value = !showAssistantInterface.value;
}
</script>
