<template>
  <div class="w-full">
    <div class="text-2xl p-4 font-bold">
      Liste des webmasters
    </div>
    <div class="p-8 w-full">
      <v-table>
        <thead>
        <tr>
          <th class="text-center">
            Email
          </th>
          <th class="text-center">
            Phone
          </th>
          <th class="text-center">
            Company name
          </th>
          <th class="text-center">
            Base url
          </th>
          <th class="text-center">
            KBIS
          </th>
          <th class="text-center">
            Impersonate
          </th>
        </tr>
        </thead>
        <tbody>
        <tr
          v-for="user in users"
          :key="user.id"
        >
          <td class="text-center">{{ user.email }}</td>
          <td class="text-center">{{ user.phoneNumber }}</td>
          <td class="text-center">{{ user.company }}</td>
          <td class="text-center">{{ user.baseUrl }}</td>
          <td>
            <div class="flex items-center justify-center">
              <v-btn
                icon="mdi-download-box"
                class="rounded"
                variant="plain"
                text="download"
              />
            </div>
          </td>
          <td>
            <div class="flex items-center justify-center">
              <v-btn
                icon="mdi-account-box"
                class="rounded"
                variant="plain"
                @click="handleImpersonateUser(user.id)"
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
import {useUserStore} from "@/stores/user";
import {storeToRefs} from "pinia";
import {useRouter} from "vue-router";

const userStore = useUserStore()
const {users} = storeToRefs(userStore)
const {findUsers, impersonateUser} = userStore
const router = useRouter()

onMounted(async () => {
  await findUsers()
})
const handleImpersonateUser = async (id: string) => {
  await impersonateUser(id);

  await router.push({name: 'webmaster'})
}
</script>

<style scoped>

</style>
