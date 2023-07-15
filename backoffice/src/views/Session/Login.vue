<template>
  <div class="h-full w-full flex flex-col items-center justify-center gap-10">
    <div class="text-2xl font-bold">
      Welcome back
    </div>
    <div class="rounded-lg w-96 p-8 shadow-lg flex flex-col  ">
      <div class="text-xl text-center mb-4">
        Login
      </div>
      <div>
        <v-text-field v-model="email" density="compact" variant="outlined" label="Email" />
        <v-text-field v-model="password" density="compact" variant="outlined" label="password" type="password" />
      </div>
      <div class="flex flex-col gap-4">
        <v-btn
          @click="submitLogin"
          color="teal"
          block
        >
          Login
        </v-btn>
        <div class="flex">
          <router-link :to="{name: 'session-register'}" class="hover:underline hover:text-teal-700">
            Register
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
import { ref } from "vue"
import { useUserStore } from '@/stores/user';
import { useRouter } from "vue-router";
import { createToast } from 'mosha-vue-toastify';
const router = useRouter();
const userStore = useUserStore();
const { login, profile } = userStore;

const email = ref('');
const password = ref('');

const submitLogin = async () => {
  try {
    await login({ email: email.value, password: password.value });
    await router.push({ name: 'webmaster'});
  } catch (error) {
    createToast('Invalid credentials', { position: "bottom-right", type: "danger" })
  }
}
</script>
