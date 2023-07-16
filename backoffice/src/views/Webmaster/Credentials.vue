<template>
  <div class="w-full">
    <div class="text-2xl p-4 font-bold">
      Page des credentials
    </div>
    <div
      v-if="!app_secret"
      class="px-4 flex items-center gap-4"
    >
      Créer un app secret
      <v-text-field
        v-model="title"
        variant="outlined"
        density="compact"
        hide-details
      />
      <v-btn variant="outlined" hide-details @click="handleCreateCredential()">
        Créer
      </v-btn>
    </div>
    <div v-else class="px-4 flex items-center gap-4">
      <p>
        Votre App secret est : {{ app_secret }} (veuillez pensez à l'enregistrer)
      </p>
      <v-btn
        @click="app_secret = null"
        variant="outlined"
      >
        Compris
      </v-btn>
    </div>
    <div class="p-8 w-full">
      <v-table>
        <thead>
        <tr>
          <th class="text-center">
            Titre
          </th>
          <th class="text-center">
            Supprimer
          </th>
        </tr>
        </thead>
        <tbody>
        <tr
          v-for="item in credentials"
          :key="item.id"
        >
          <td>{{ item.title }}</td>
          <td>
            <div class="flex items-center justify-center">
              <v-btn
                icon="mdi-trash-can"
                class="rounded"
                variant="plain"
                color="red"
                text="download"
                @click="handleDeleteCredential(item.id)"
              />
            </div>
          </td>
        </tr>
        </tbody>
      </v-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useCredentialsStore} from "@/stores/credentials";
import {storeToRefs} from "pinia";

const credentialsStore = useCredentialsStore()
const {credentials} = storeToRefs(credentialsStore)
const {createCredential, findCredentials, removeCredential} = credentialsStore

onMounted(async () => {
  await findCredentials()
})

const title = ref<string|null>(null)
const app_secret = ref<string|null>(null)

const handleDeleteCredential = async (id: string) => {
  await removeCredential(id)
  title.value = ''
  await findCredentials();
}

const handleCreateCredential = async () => {
  const res = await createCredential({title: title.value})
  app_secret.value = res.secret
}
</script>

<style scoped>

</style>
