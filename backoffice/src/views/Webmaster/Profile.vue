<template>
  <div class="tw-w-full">
    <div class="tw-text-2xl tw-p-4 tw-font-bold">
      Page de profile + Credentials
    </div>
    <div class="tw-p-8 tw-w-full tw-flex tw-flex-col tw-gap-5 tw-items-center tw-justify-center">
      <v-avatar color="surface-variant" size="100"></v-avatar>
      <v-text-field type="file" variant="outlined" label="Image de profil" class="tw-w-full"/>
      <v-text-field variant="outlined" label="Email" class="tw-w-full"/>
      <v-text-field variant="outlined" label="Nom de la société" class="tw-w-full"/>
      <v-text-field type="file" variant="outlined" label="KBIS" class="tw-w-full"/>
      <v-text-field variant="outlined" label="Numéro de téléphone" class="tw-w-full"/>
      <v-text-field variant="outlined" label="Url de votre site" class="tw-w-full"/>
      <v-btn variant="outlined" color="blue">Modifier</v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>

</style>