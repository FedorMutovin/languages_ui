<template>
  <div class="q-gutter-md q-pa-md flex justify-center">
    <div class="flex full-width justify-center text-h6 text-center">{{ $t('account.choose_language') }}</div>
    <q-card v-ripple:primary @click="submit(language)" flat bordered v-for="language in languagesStore.for_learning" :key="language.id" class="flex column cursor-pointer q-hoverable" style="width: 150px">
      <div class="flex flex-center q-mt-lg full-width">
        <country-flag rounded :country="languagesStore.getFlagCodeByLocale(language.locale)" size="big" />
      </div>
      <q-card-section class="text-center">
        <div class="text-subtitle1">{{ language.name }}</div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useAccountLearningLanguageStore } from "stores/account_learning_language_store";
import { useLanguagesStore } from "stores/languages_store";
import {useRouter} from "vue-router";
import { useDefaultData } from "components/mixins/use_default_data";
import { useApi } from 'components/mixins/use_api';

const router = useRouter();
const { api } = useApi();
const { loading, errors } = useDefaultData();
const accountLearningLanguageStore = useAccountLearningLanguageStore();
const languagesStore = useLanguagesStore();
const submit = async (language) => {
  loading.value = true;
  const formData = new FormData();
  formData.append("account_learning_languages[language_id]", language.id);

  try {
    const response = await api.account_learning_languages.create(formData);
    accountLearningLanguageStore.setAccountLearningLanguage(response.data);
    await router.push({name: 'account'});
  } catch (error) {
    console.log(error);
    errors.value = error.response.data.errors;
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  if (languagesStore.for_learning.length === 0) {
    await languagesStore.getAllLanguages();
  }
});
</script>
<style scoped>
.q-card.q-hoverable:hover {
  border-color: #4F46E5 !important;
}

.q-card.q-hoverable:hover .text-subtitle1 {
  color: #4F46E5 ;
}
</style>
