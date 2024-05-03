<template>
  <q-layout view="hhh lpR fff" width="500px">
    <q-header elevated class="bg-transparent text-dark">
      <div style="width: 100%; max-width: 1200px; margin: auto;">
        <q-toolbar>
          <q-toolbar-title>Learning Languages</q-toolbar-title>
        </q-toolbar>
      </div>
    </q-header>

    <q-page-container>
      <q-page class="flex flex-center column content-center">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </q-page>
    </q-page-container>

    <q-footer reveal class="bg-grey-8 text-white">
    </q-footer>
  </q-layout>
</template>
<script setup>
</script>
