<template>
  <q-layout view="hhh lpR fff">
    <q-header elevated class="bg-transparent text-dark">
      <div style="width: 100%; max-width: 1200px; margin: auto">
        <q-toolbar>
          <q-toolbar-title>Learning Languages</q-toolbar-title>
          <q-space />
          <q-field borderless>
            <template v-slot:control>
              <div>{{ $t("authorization.site_language") }}</div>
            </template>
            <template v-slot:append>
              <q-select
                v-model="locale"
                :options="languagesStore.for_interface"
                option-value="locale"
                option-label="name"
                dense
                borderless
                emit-value
                map-options
                options-dense
                behavior="menu"
                style="width: 100%; min-width: 100px"
              />
            </template>
          </q-field>
        </q-toolbar>
      </div>
    </q-header>

    <q-page-container>
      <q-page>
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </q-page>
    </q-page-container>

    <q-footer reveal class="bg-grey-8 text-white"> </q-footer>
  </q-layout>
</template>
<script setup>
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useLanguagesStore } from "stores/languages_store";

const { locale } = useI18n({ useScope: "global" });
const languagesStore = useLanguagesStore();

onMounted(async () => {
  if (languagesStore.for_interface.length === 0) {
    await languagesStore.getAllLanguages();
  }
});
</script>
