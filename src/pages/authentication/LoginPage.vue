<template>
  <q-card
    flat
    class="q-pa-md"
    style="width: 100%; max-width: 600px; margin: auto"
  >
    <q-card-section>
      <div class="text-h6 text-dark text-center">
        {{ $t("authorization.login") }}
      </div>
      <div class="text-subtitle2 text-center q-mt-sm">
        {{ $t("authorization.signup_tip") }}
        <router-link to="/sign_up" class="text-primary">{{
          $t("authorization.signup")
        }}</router-link>
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
          <div class="row justify-center q-mt-md">
            <q-btn
              rounded
              push
              :loading="loading"
              :label="$t('authorization.login_submit')"
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
import { useSessionStore } from "stores/session_store";
import { useDefaultData } from "components/use/default_data";

const router = useRouter();
const { loading } = useDefaultData();
const userStore = useUserStore();
const sessionStore = useSessionStore();

const email = ref(null);
const password = ref(null);
const hidePassword = ref(true);

const onSubmit = async () => {
  loading.value = true;
  const formData = new FormData();
  formData.append("user[email]", email.value);
  formData.append("user[password]", password.value);

  try {
    const response = await sessionStore.create(formData);
    userStore.setUser(response.data);
    await router.push({ name: "account" });
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
};
</script>
