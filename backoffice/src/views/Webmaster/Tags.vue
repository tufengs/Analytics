<template>
  <div class="w-full">
    <div class="text-2xl p-4 font-bold">
      Page des tags
    </div>
    <div class="p-8 w-full">
      <v-table>
        <thead>
        <tr>
          <th class="text-center">
            Email
          </th>
          <th class="text-center">
            N° de tel
          </th>
          <th class="text-center">
            Nom de la société
          </th>
          <th class="text-center">
            Url du site
          </th>
          <th class="text-center">
            KBIS
          </th>
          <th class="text-center">
            Actions
          </th>
        </tr>
        </thead>
        <tbody>
        <tr
          v-for="item in desserts"
          :key="item.id"
        >
          <td>{{ item.email }}</td>
          <td>{{ item.phoneNumber }}</td>
          <td>{{ item.company }}</td>
          <td>{{ item.url }}</td>
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
                @click="handleImpersonateUser(item.id)"
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
import {ref} from "vue";

const desserts = ref([
  {
    id: '123',
    email: 'Frozen Yogurt',
    phoneNumber: 159,
    company: 159,
    kbis: '',
    url: 159,
  },
])

const handleImpersonateUser = (id: string) => {

}
</script>

<style scoped>

</style>
