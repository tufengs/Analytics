<template>
  <div class="h-full w-full flex flex-col items-center justify-center gap-10">
    <div class="text-2xl font-bold">
      Welcome back
    </div>
    <div class="rounded-lg w-96 p-8 shadow-lg flex flex-col  ">
      <div class="text-xl text-center mb-4">
        Register
      </div>
      <div>
        <v-text-field v-model="email" density="compact" variant="outlined" label="Email" type="email" />
        <v-text-field v-model="password" density="compact" variant="outlined" label="Password" type="password" />
        <v-text-field v-model="company" density="compact" variant="outlined" label="Company name"/>
        <v-input-file variant="outlined" density="compact" label="KBIS"/>
        <v-text-field v-model="baseUrl" density="compact" variant="outlined" label="Base url of yout website" />
      </div>
      <div class="flex flex-col gap-4">
        <v-btn
          @click="submitRegister"
          color="purple-darken-3"
          block
        >
          Confirm
        </v-btn>
        <div class="flex">
          <router-link :to="{name: 'session-login'}" class="hover:underline hover:text-teal-700">
            Login
          </router-link>
          <v-spacer />
          <router-link :to="{name: 'session-password-forgot'}" class="hover:underline hover:text-teal-700">
            Password forgotten ?
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from '@/stores/user';
import { useRouter } from "vue-router";
import { createToast } from 'mosha-vue-toastify';
const router = useRouter();
const userStore = useUserStore();
const { register } = userStore;

const email = ref('')
const password = ref('')
const company = ref('')
const baseUrl = ref('')

const submitRegister = async () => {
  try {
    await register({ email: email.value, password: password.value, company: company.value, baseUrl: baseUrl.value })
    createToast('Account created', { position: "bottom-right", type: "success" })
  } catch (error) {
    createToast('Error while trying to sign up', { position: "bottom-right", type: "danger" })
  }
}

</script>
