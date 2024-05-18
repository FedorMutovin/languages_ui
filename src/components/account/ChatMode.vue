<template>
  <div class="row justify-center">
    <div class="col-4 col-md-2">
      <q-select
        filled
        options-cover
        behavior="menu"
        dense
        v-model="chatStore.mode"
        :options="['Translate', 'Correct']"
        label="Select Mode"
      />
    </div>
  </div>
  <div v-if="isTranslateMode" class="row justify-center q-ma-md">
    <div class="col">
      <div class="row justify-center">
        <div class="col-4 col-md-1">
          <q-select
            filled
            dense
            options-cover
            behavior="menu"
            v-model="chatStore.source_language"
            :options="languageOptions"
            label="From"
          />
        </div>
        <div class="col-2 col-md-1 flex justify-center">
          <q-icon name="mdi-arrow-right" class="q-ma-md text-primary" />
        </div>
        <div class="col-4 col-md-1">
          <q-select
            filled
            dense
            options-cover
            v-model="chatStore.target_language"
            :options="languageOptions"
            label="To"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from "vue";
import { useChatStore } from "stores/chat_store";

const chatStore = useChatStore();
const languageOptions = [
  { label: "English", value: "en" },
  { label: "Russian", value: "ru" },
  { label: "Spanish", value: "es" },
  { label: "French", value: "fr" },
];

const isTranslateMode = computed(() => chatStore.mode === "Translate");
</script>
