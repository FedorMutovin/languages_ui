<template>
  <q-card
    flat
    class="q-pa-md"
    style="width: 100%; max-width: 600px; margin: auto"
  >
    <q-card-section>
      <div class="text-h6 text-dark text-center">
        {{ $t("authorization.signup_title") }}
      </div>
    </q-card-section>
    <q-card-section>
      <div style="max-width: 350px; margin: auto; width: 100%">
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input
            outlined
            clearable
            v-model="email"
            type="email"
            :label="$t('authorization.email')"
          />

          <q-input
            v-model="password"
            outlined
            :type="hidePassword ? 'password' : 'text'"
            lazy-rules
            :label="$t('authorization.password')"
          >
            <template v-slot:append>
              <q-icon
                :name="hidePassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="hidePassword = !hidePassword"
              />
            </template>
          </q-input>
          <q-toggle
            v-model="accept"
            :label="$t('authorization.terms')"
            class="q-mt-md"
          />
          <div class="row justify-center q-mt-md">
            <q-btn
              rounded
              push
              :loading="loading"
              :label="$t('authorization.signup_submit')"
              type="submit"
              color="primary"
              style="width: 300px"
              class="full-width"
            />
          </div>
        </q-form>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "stores/user_store";
import { useLanguagesStore } from "stores/languages_store";
import { useSessionStore } from "stores/session_store";
import { useDefaultData } from "components/use/default_data";
import { useApi } from "components/use/api";
import { useI18n } from "vue-i18n";

const router = useRouter();
const { api } = useApi();
const { loading } = useDefaultData();
const userStore = useUserStore();
const languagesStore = useLanguagesStore();
const sessionStore = useSessionStore();
const { locale } = useI18n({ useScope: "global" });

const email = ref(null);
const password = ref(null);
const hidePassword = ref(true);
const accept = ref(false);

const onSubmit = async () => {
  loading.value = true;
  const formData = new FormData();
  formData.append("user[email]", email.value);
  formData.append("user[password]", password.value);
  formData.append(
    "user[language_id]",
    languagesStore.findLanguageIdByLocale(locale.value)
  );

  try {
    const response = await api.registrations.create(formData);
    const token = await response.headers.authorization.split(" ")[1];
    sessionStore.updateToken(token);
    userStore.setUser(response.data);
    await router.push({ name: "choose_language" });
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
};
</script>
