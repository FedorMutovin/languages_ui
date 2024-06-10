<template>
  <q-btn-dropdown
    dropdown-icon="mdi-dots-horizontal"
    dense
    flat
    round
    no-icon-animation
  >
    <div class="row no-wrap q-pa-md">
      <div class="column items-center">
        <div class="text-h6 q-mb-md">{{ $t("account.settings") }}</div>
        <div class="text-subtitle1 q-mt-md q-mb-xs">{{ userStore.email }}</div>

        <q-btn
          color="primary"
          :label="$t('authorization.logout')"
          push
          size="sm"
          v-close-popup
          @click="logout"
        />
      </div>
    </div>
  </q-btn-dropdown>
</template>
<script setup>
import { useUserStore } from "stores/user_store";
import { useSessionStore } from "stores/session_store";
import { useAccountLearningLanguageStore } from "stores/account_learning_language_store";
import { useLanguagesStore } from "stores/languages_store";
import { useDefaultData } from "components/use/default_data";
import { useApi } from "components/use/api";
import { useI18n } from "vue-i18n";
import {onMounted} from "vue";

const { locale } = useI18n({ useScope: "global" });
const languagesStore = useLanguagesStore();
const userStore = useUserStore();
const sessionStore = useSessionStore();
const accountLearningLanguageStore = useAccountLearningLanguageStore();
const { api } = useApi();
const { loading } = useDefaultData();

onMounted(async () => {
  if (languagesStore.for_interface.length === 0) {
    await languagesStore.getAllLanguages();
  }
  locale.value = userStore.language.locale
});

const logout = async () => {
  loading.value = true;

  try {
    await api.sessions.destroy();
    sessionStore.$reset();
    userStore.$reset();
    accountLearningLanguageStore.$reset();
    window.location.reload();
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};
</script>
