<template>
  <div
    class="absolute bottom-0 w-full h-20 bg-neutral-900 text-white flex items-center p-10"
  >
    You are currently impersonating {{currentUser?.email}} <div class="underline px-3 cursor-pointer hover:text-slate-300" @click="handleLogoutImpersonateUser">Disconnect</div>
  </div>
</template>

<script setup lang="ts">

import {tokenAsAdmin} from "@/service/axios";
import {useUserStore} from "@/stores/user";
import {storeToRefs} from "pinia";
import {useRouter} from "vue-router";
const userStore = useUserStore()
const {currentUser} = storeToRefs(userStore)
const {logoutImpersonateUser} = userStore
const router = useRouter()
const handleLogoutImpersonateUser = async () => {
  await logoutImpersonateUser();

  await router.push({name: 'admin'})
}
</script>

<style scoped>

</style>