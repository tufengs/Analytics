<template>
  <div class="h-full w-full flex flex-col items-center justify-center gap-10">
    <div class="text-2xl font-bold">
      Bienvenue sur le back-office de SDK
    </div>
    <div class="border-2 rounded-lg w-96 p-4 shadow-lg flex flex-col  ">
      <div class="text-xl text-center mb-4">
        Réinitialiser mon mot de passe
      </div>
      <div class="mb-4 text-neutral-500 text-sm">
        Pour réinitialiser votre mot de passe, veuillez entrez un email, si un celui existe un mail vous sera envoyé.
      </div>
      <div>
        <v-text-field variant="outlined" label="email"/>
      </div>
      <div class="flex flex-col gap-4">
        <v-btn
          color="teal"
          block
        >
          Envoyer le mail
        </v-btn>
        <div class="flex">
          <router-link :to="{name: 'session-login'}" class="hover:underline hover:text-teal-700">
            Se connecter
          </router-link>
          <v-spacer />
          <router-link :to="{name: 'session-register'}" class="hover:underline hover:text-teal-700">
            S'enregistrer
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
