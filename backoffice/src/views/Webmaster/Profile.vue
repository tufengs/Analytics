<template>
  <div class="w-full">
    <div class="text-2xl p-4 font-bold">
      Page de profile
    </div>
    <div class="p-8 w-full flex flex-col gap-5 items-center justify-center">
      <v-avatar color="surface-variant" size="100"></v-avatar>
      <v-text-field density="compact" type="file" variant="outlined" label="Image de profil" class="w-full" />
      <v-text-field density="compact" variant="outlined" label="Email" class="w-full" />
      <v-text-field density="compact" variant="outlined" label="Nom de la société" class="w-full" />
      <v-text-field density="compact" type="file" variant="outlined" label="KBIS" class="w-full" />
      <v-text-field density="compact" variant="outlined" label="Numéro de téléphone" class="w-full" />
      <v-text-field density="compact" variant="outlined" label="Url de votre site" class="w-full" />
      <v-btn color="blue" variant="tonal">Modifier</v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped></style>
