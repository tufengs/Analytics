<template>
  <div>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import {useUserStore} from "@/stores/user";
import {onMounted} from "vue";
import {useRouter} from "vue-router";

const userStore = useUserStore()
const {isAdmin, isWebmaster} = userStore
const router = useRouter()

onMounted(() => {
  if (isAdmin()) {
    router.push({name: 'admin'})
  } else if(isWebmaster()) {
    router.push({name: 'webmaster'})
  }
})
</script>
