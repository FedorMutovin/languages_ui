<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title> Learning Languages </q-toolbar-title>
        <AccountSettings />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
      <LanguageAssistant class="absolute-bottom-right q-ma-lg" />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import LanguageAssistant from "components/account/LanguageAssistant.vue";
import AccountSettings from "components/account/AccountSettings.vue";
</script>
