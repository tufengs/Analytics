<template>
  <div class="w-full">
    <div class="text-2xl p-4 font-bold">
      Profile
    </div>
    <div v-if='user' class="p-8 w-full flex flex-col gap-5 items-center justify-center">
      <v-avatar color="surface-variant" size="100"></v-avatar>
      <v-text-field v-model="user.email" density="compact" variant="outlined" label="Email" class="w-full" disabled/>
      <v-text-field v-model="user.company" density="compact" variant="outlined" label="Company name" class="w-full"/>
      <v-text-field v-model="user.baseUrl" density="compact" variant="outlined" label="Base url" class="w-full"/>
      <v-btn @click="update" variant="tonal" color="purple-darken-3">Update</v-btn>
    </div>
  </div>
</template>



<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const {currentUser} = storeToRefs(userStore);
const router = useRouter();
const {findUser, updateCurrentUser} = userStore
const user = ref()


const update = async () => {
  try {
    const data = {
      company: user.value.company,
      baseUrl: user.value.baseUrl
    }
    await updateCurrentUser(data)
  } catch (e) {
    console.log(e)
  }
}

onMounted(async () => {
  const userId = currentUser.value.sub

  user.value = await findUser(userId);
  console.log(user.value)
});
</script>

<style scoped>

</style>