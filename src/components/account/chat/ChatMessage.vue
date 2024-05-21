<template>
  <div class="q-pb-sm" v-for="(value, key) in messageBody" :key="key">
    <div class="text-subtitle2">{{ $t(`account.${key}_key`) }}</div>
    <div class="text-body2">{{ value }}</div>
  </div>
</template>
<script setup>
defineProps({
  messageBody: Object,
})
</script>
