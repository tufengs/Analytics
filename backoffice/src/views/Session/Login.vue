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
        <v-text-field variant="outlined" label="email"/>
        <v-text-field variant="outlined" label="mot de passe" type="password"/>
      </div>
      <div class="flex flex-col gap-4">
        <v-btn
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
</script>
