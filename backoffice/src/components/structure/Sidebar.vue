<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
        permanent
      >
        <v-list nav>
          <v-list-item>
            <div @click="router.push({ name: 'home' })" class="flex items-center gap-x-3 cursor-pointer">
              <font-awesome-icon :icon="['fas', 'chart-pie']" />
              <p class="italic text-slate-800 text-xl">Analytics</p>
            </div>
          </v-list-item>
          <v-list-item
            v-if="isAdmin()"
            v-for="path in admin_path"
            class="flex items-center gap-x-3"
            :title="path.title"
            :value="path.value"
            :to="{name: path.to}"
            exact
          >
            <template #prepend>
              <font-awesome-icon :icon="['fas', path.icon]" />
            </template>
          </v-list-item>
          <v-list-item
            v-if="isWebmaster()"
            v-for="path in webmaster_path"
            class="flex items-center gap-x-3"
            :title="path.title"
            :value="path.value"
            :to="{name: path.to}"
            exact
            >
            <template #prepend>
              <font-awesome-icon :icon="['fas', path.icon]" />
            </template>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-layout>
  </v-card>
</template>

<script setup lang='ts'>
import { useRouter } from "vue-router";
import {ref} from "vue";
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();

const { isAdmin, isWebmaster } = userStore;

const router = useRouter();
const admin_path = ref([
  {
    icon: 'chart-bar',
    title: 'Webmasters',
    value: 'webmasters',
    to: 'admin-webmasters',
  },
  {
    icon: 'chart-area',
    title: 'Webmasters Request',
    value: 'webmasters-request',
    to: 'admin-webmasters-request',
  }
])

const webmaster_path = ref([
  {
    icon: 'chart-bar',
    title: 'Dashboard',
    value: 'dashboard',
    to: 'webmaster-dashboard',
  },
  {
    icon: 'chart-line',
    title: 'Funnels',
    value: 'funnels',
    to: 'webmaster-funnels',
  },
  {
    icon: 'chart-area',
    title: 'Tags',
    value: 'tags',
    to: 'webmaster-tags',
  },
  {
    icon: 'user',
    title: 'Profile',
    value: 'profile',
    to: 'webmaster-profile',
  }
])
const tab = ref<string>('')
</script>

<style scoped>

</style>
