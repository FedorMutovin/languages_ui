<template>
  <div class="q-pb-sm" v-for="(value, key) in messageBody" :key="key">
    <q-expansion-item
      v-if="isDropdownKey(key)"
      :label="$t(`account.${key}_key`)"
      dense
      header-class="text-subtitle2"
      expand-icon-class="text-secondary"
      expand-separator
    >
      <div class="text-body2">{{ value }}</div>
    </q-expansion-item>
    <div v-else>
      <div class="text-subtitle2">{{ $t(`account.${key}_key`) }}</div>
      <div class="text-body2">{{ value }}</div>
    </div>
  </div>
</template>
<script setup>
defineProps({
  messageBody: Object,
})
const isDropdownKey = (key) => ['explanation', 'recommendations'].includes(key);
</script>
