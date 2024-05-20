<template>
  <div class="row justify-center">
    <div class="col-2 col-md-1"></div>
    <div class="col-5 col-md-2 q-pa-sm">
      <q-select
        filled
        options-cover
        behavior="menu"
        dense
        v-model="chatStore.mode"
        :options="['Translate', 'Correct']"
        :label="$t('account.select_mode')"
      />
    </div>
    <div class="col-2 col-md-1 flex self-center">
      <q-btn v-if="isTranslateMode" color="primary" flat round icon="mdi-cog-transfer-outline" size="md">
        <q-tooltip class="bg-primary" :offset="[10, 10]">
          {{ $t("account.change_translation_direction") }}
        </q-tooltip>
        <q-menu
          anchor="top middle"
          self="bottom middle"
        >
          <div class="row q-pa-md bg-primary flex justify-center items-center">
            <div class="text-white q-ma-sm">
              {{chatStore.source_language}}
            </div>
            <div class="text-white q-ma-sm">
              <q-btn class="bg-transparent" outline round color="white" icon="mdi-swap-horizontal" size="sm" @click="chatStore.reverseLanguages()" />
            </div>
            <div class="text-white q-ma-sm">
              {{chatStore.target_language}}
            </div>
          </div>
        </q-menu>
      </q-btn>
    </div>
  </div>
</template>
<script setup>
import { computed } from "vue";
import { useChatStore } from "stores/chat_store";
const chatStore = useChatStore();
const isTranslateMode = computed(() => chatStore.mode === "Translate");
</script>
