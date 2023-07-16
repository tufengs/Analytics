<template>
  <div class="px-5 h-14 bg-white border-b flex items-center">
    <div @click="router.push({ name: 'home' })" class="flex items-center gap-x-3 cursor-pointer">
      <font-awesome-icon :icon="['fas', 'chart-pie']" />
      <p class="italic text-slate-800 text-xl">Analytics</p>
    </div>
    <v-spacer></v-spacer>
    <div v-if="currentUser" class="flex gap-2">
      <div @click="router.push({ name: 'webmaster-profile' })" class="border rounded-xl px-3 py-2 cursor-pointer text-slate-800 hover:bg-slate-50">{{ currentUser.email }}</div>
      <div class="border rounded-xl px-3 py-2 cursor-pointer text-slate-800 hover:bg-slate-50"
        @click="handleLogout()"
      >
        <font-awesome-icon :icon="['fas', 'arrow-right']" />
      </div>
    </div>
    <div v-else class="flex gap-x-3">
      <button @click.stop="router.push({ name: 'session-register' })" class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
          Sign up
      </button>

      <button @click.stop="router.push({ name: 'session-login' })" class="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-[#6A1B9A] rounded-lg shrink-0 sm:w-auto hover:bg-[#6A1B9A]/80 dark:hover:bg-blue-500 dark:bg-blue-600">
          Sign in
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const {logout} = userStore
const { currentUser } = storeToRefs(userStore);
const router = useRouter();

const handleLogout = () => {
  logout();
  router.push({name: 'session-login'})
}
</script>
