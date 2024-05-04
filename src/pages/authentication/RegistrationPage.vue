<template>
  <q-card flat class="q-pa-md" style="width: 100%; max-width: 600px; margin: auto;">
    <q-card-section>
      <div class="text-h6 text-dark text-center">Create your account</div>
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

          <div class="row justify-center q-mt-md">
            <q-btn rounded
                   :loading="loading"
                   label="CREATE ACCOUNT"
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useDefaultData } from "components/mixins/use_default_data";
import { useApi } from 'components/mixins/use_api';

const router = useRouter();
const { api } = useApi();
const { loading, errors } = useDefaultData();

const email = ref(null);
const password = ref(null);
const hidePassword = ref(true);

const onSubmit = async () => {
  loading.value = true;
  const formData = new FormData();
  formData.append("user[email]", email.value);
  formData.append("user[password]", password.value);

  try {
    await api.registrations.create(formData);
    await router.push({name: 'sign_in'});
  } catch (error) {
    errors.value = error.response.data.errors;
  } finally {
    loading.value = false;
  }
};
</script>

