<template>
  <q-card flat class="q-pa-md" style="width: 100%; max-width: 600px; margin: auto;">
    <q-card-section>
      <div class="text-h6 text-dark text-center">Log in</div>
      <div class="text-subtitle2 text-center q-mt-sm">
        Don't have an account?
        <router-link to="/sign_up" class="text-primary">Sign up</router-link>
      </div>
    </q-card-section>
    <q-card-section>
      <div style="max-width: 350px; margin: auto; width: 100%;">
        <q-form
          @submit="onSubmit"
          class="q-gutter-md"
        >
          <q-input
            outlined
            clearable
            v-model="email"
            type="email"
            label="Email"
            :error-message="errors.email ? errors.email[0] : ''"
            :error="errors.email !== undefined"
            @focus="delete errors.email"
          />

          <q-input v-model="password"
                   outlined :type="hidePassword ? 'password' : 'text'"
                   lazy-rules
                   label="Password"
                   :error-message="errors.password ? errors.password[0] : ''"
                   :error="errors.password !== undefined"
                   @focus="delete errors.password"
          >
            <template v-slot:append>
              <q-icon
                :name="hidePassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="hidePassword = !hidePassword"
              />
            </template>
          </q-input>

          <q-toggle v-model="accept" label="I accept the license and terms" class="q-mt-md" />
          <div class="row justify-center q-mt-md">
            <q-btn rounded
                   :loading="loading"
                   label="LOG IN"
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

<script>
// import { useQuasar } from 'quasar'
import { ref } from 'vue'
import { useDefaultData } from "components/mixins/use_default_data";
import { useApi } from 'components/mixins/use_api';
import { useRouter } from 'vue-router';
import { useUserStore } from "stores/user_store"
import { useSessionStore } from "stores/session_store"

export default {
  name: 'LoginPage',
  setup () {
    // const $q = useQuasar()
    const { loading, errors } = useDefaultData();
    const email = ref(null)
    const password = ref(null)
    const hidePassword = ref(true)
    const { api } = useApi();
    const router = useRouter();
    const accept = ref(false)
    const userStore = useUserStore();
    const sessionStore = useSessionStore();

    return {
      userStore,
      sessionStore,
      email,
      password,
      accept,
      hidePassword,
      loading,
      errors,
      onSubmit: async() => {
        loading.value = true;
        const formData = new FormData();
        formData.append("user[email]", email.value);
        formData.append("user[password]", password.value);

        try {
          const response = await api.sessions.create(formData);
          await sessionStore.updateToken(response.headers.authorization);
          await userStore.setUser(response.data);
          await router.push({name: 'account'});
        } catch (error) {
          console.log(error)
          errors.value = error.response.data.errors;
        } finally {
          loading.value = false;
        }
      }
    }
  },
}
</script>
