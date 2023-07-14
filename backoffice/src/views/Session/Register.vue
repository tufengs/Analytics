<template>
  <div class="h-full w-full flex flex-col items-center justify-center gap-10">
    <div class="text-2xl font-bold">
      Bienvenue sur le back-office de SDK
    </div>
    <div class="border-2 rounded-lg w-96 p-4 shadow-lg flex flex-col  ">
      <div class="text-xl text-center mb-4">
        S'enregistrer
      </div>
      <div>
        <v-text-field variant="outlined" label="Email"/>
        <v-text-field variant="outlined" label="Mot de passe" type="password"/>
        <v-text-field variant="outlined" label="Nom de la société"/>
        <v-text-field variant="outlined" label="KBIS"/>
        <v-text-field variant="outlined" label="Numéro de téléphone"/>
        <v-text-field variant="outlined" label="Url de votre site"/>
      </div>
      <div class="flex flex-col gap-4">
        <v-btn
          color="teal"
          block
        >
          Confirmer
        </v-btn>
        <div class="flex">
          <router-link :to="{name: 'session-login'}" class="hover:underline hover:text-teal-700">
            Se connecter
          </router-link>
          <v-spacer />
          <router-link :to="{name: 'session-password-forgot'}" class="hover:underline hover:text-teal-700">
            Mot de passe oublié
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
