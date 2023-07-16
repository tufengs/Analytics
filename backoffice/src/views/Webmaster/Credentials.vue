<template>
  <div class="w-full">
    <h2 class="text-slate-800 font-bold text-2xl pb-3">Credentials</h2>

    <div v-if="!app_secret" class="flex items-center gap-4">
      <v-text-field v-model="title" density="compact" hide-details placeholder="Enter secret name" />
      <v-btn hide-details @click="handleCreateCredential()" color="purple-darken-3" variant="tonal">
        Create
      </v-btn>
    </div>

    <div v-else class="flex items-center gap-4">
      <div class="flex gap-x-3 items-center">
        <p>
          Your secret app is : {{ app_secret }} (be sure to save it !)
        </p>
        <v-btn @click="copyToClipboard(app_secret, true)" variant="tonal" color="purple-darken-3" rounded icon=""
          height="40" width="40">
          <font-awesome-icon :icon="['fas', 'clipboard']" />
        </v-btn>
      </div>
      <v-btn @click="app_secret = null" variant="tonal" color="purple-darken-3">
        Gotcha
      </v-btn>
    </div>
    <div class="flex items-center gap-x-3 py-3 italic text-slate-800 font-medium">
      <p>
        Your APP_ID : <span class="font-bold">{{ currentUser.app_id }}</span>
      </p>
      <v-btn @click="copyToClipboard(currentUser.app_id, false)" variant="tonal" color="purple-darken-3" rounded icon=""
        height="40" width="40">
        <font-awesome-icon :icon="['fas', 'clipboard']" />
      </v-btn>
    </div>
    <div class="p-8 w-full">
      <v-table>
        <thead>
          <tr>
            <th class="text-center">
              Title
            </th>
            <th class="text-center">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="credential in credentials" :key="credential.id">
            <td class="text-center">{{ credential.title }}</td>
            <td>
              <div class="flex items-center justify-center">
                <v-btn icon="mdi-trash-can" class="rounded" variant="plain" color="red" text="download"
                  @click="handleDeleteCredential(credential.id)" />
              </div>
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useCredentialsStore } from "@/stores/credentials";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { createToast } from "mosha-vue-toastify";
const credentialsStore = useCredentialsStore()
const { credentials } = storeToRefs(credentialsStore)
const { createCredential, findCredentials, removeCredential } = credentialsStore
const userStore = useUserStore();
const { currentUser } = storeToRefs(userStore);


onMounted(async () => {
  await findCredentials()
})

const title = ref<string | null>(null)
const app_secret = ref<string | null>(null)

const handleDeleteCredential = async (id: string) => {
  await removeCredential(id)
  title.value = ''
  await findCredentials();
}
const copyToClipboard = (id: string, app_secret: boolean) => {
  try {
    navigator.clipboard.writeText(id);
    createToast(`${app_secret ? 'APP_SECRET' : 'APP_ID'} copied to clipboard`, { type: 'success', position: 'bottom-right' })
  } catch (error) {
  }
}
const handleCreateCredential = async () => {
  if (!title.value) return createToast('Please enter a title', { type: 'warning', position: 'bottom-right' });
  const res = await createCredential({ title: title.value })
  app_secret.value = res.secret;
  title.value = '';
}
</script>

<style scoped></style>
