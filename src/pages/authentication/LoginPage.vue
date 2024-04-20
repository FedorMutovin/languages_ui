<template>
  <q-page class="flex flex-center">
    <q-card flat>
      <q-card-section class="text-center">
        <q-avatar size="100px">
          <img src="~assets/main-icon.png">
        </q-avatar>
      </q-card-section>
      <q-card-section>
        <div class="text-h6 text-dark text-center">Sign in to your account</div>
      </q-card-section>
      <q-card-section>
          <div style="max-width: 600px">

            <q-form
              @submit="onSubmit"
              @reset="onReset"
              class="q-gutter-md"
            >
              <q-input
                filled
                v-model="email"
                label="Your email *"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />

              <q-input
                filled
                v-model="password"
                label="Your password *"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />

              <q-toggle v-model="accept" label="I accept the license and terms" />

              <div>
                <q-btn label="Submit" type="submit" color="primary"/>
                <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
              </div>
            </q-form>

          </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { useQuasar } from 'quasar'
import { ref } from 'vue'

export default {
  name: 'LoginPage',
  setup () {
    const $q = useQuasar()

    const email = ref(null)
    const password = ref(null)
    const accept = ref(false)

    return {
      email,
      password,
      accept,

      onSubmit () {
        console.log()
        if (accept.value !== true) {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'You need to accept the license and terms first'
          })
        }
        else {
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Submitted'
          })
        }
      },

      onReset () {
        email.value = null
        password.value = null
        accept.value = false
      }
    }
  }
}
</script>
