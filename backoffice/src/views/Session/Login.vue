<template>
  <div class="tw-h-full tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-10">
    <div class="tw-text-2xl tw-font-bold">
      Bienvenue sur le back-office de SDK
    </div>
    <div class="tw-border-2 tw-rounded-lg tw-w-96 tw-p-4 tw-shadow-lg tw-flex tw-flex-col  ">
      <div class="tw-text-xl tw-text-center tw-mb-4">
        Login
      </div>
      <div>
        <v-text-field variant="outlined" label="email"/>
        <v-text-field variant="outlined" label="mot de passe" type="password"/>
      </div>
      <div class="tw-flex tw-flex-col tw-gap-4">
        <v-btn
          color="teal"
          block
        >
          Se connecter
        </v-btn>
        <div class="tw-flex">
          <router-link :to="{name: 'session-register'}" class="hover:tw-underline hover:text-teal-700">
            S'enregistrer
          </router-link>
          <v-spacer />
          <router-link :to="{name: 'session-password-forgot'}" class="hover:tw-underline hover:text-teal-700">
            Mot de passe oublié ?
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
