<template>
  <div class="h-full w-full flex flex-col items-center justify-center gap-10">
    <div class="text-2xl font-bold">
      Bienvenue sur le back-office de SDK
    </div>
    <div class="border-2 rounded-lg w-96 p-4 shadow-lg flex flex-col  ">
      <div class="text-xl text-center mb-4">
        Login
      </div>
      <div>
        <v-text-field v-model="email" variant="outlined" label="email"/>
        <v-text-field v-model="password" variant="outlined" label="mot de passe" type="password"/>
      </div>
      <div class="flex flex-col gap-4">
        <v-btn
          @click="submitLogin"
          color="teal"
          block
        >
          Se connecter
        </v-btn>
        <div class="flex">
          <router-link :to="{name: 'session-register'}" class="hover:underline hover:text-teal-700">
            S'enregistrer
          </router-link>
          <v-spacer />
          <router-link :to="{name: 'session-password-forgot'}" class="hover:underline hover:text-teal-700">
            Mot de passe oublié ?
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
    await router.push({ name: 'home'});
  } catch (error) {
    createToast('Invalid credentials', { position: "bottom-right", type: "danger" })
  }
}
</script>
