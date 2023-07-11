<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
        permanent
      >
        <v-list nav>
          <v-list-item
            v-for="path in admin_path"
            :prepend-icon="path.icon"
            :title="path.title"
            :value="path.value"
            :to="{name: path.to}"
          />
          <v-list-item
            v-for="path in webmaster_path"
            :prepend-icon="path.icon"
            :title="path.title"
            :value="path.value"
            :to="{name: path.to}"
          />
        </v-list>
      </v-navigation-drawer>
    </v-layout>
  </v-card>
</template>

<script setup lang='ts'>

import {ref} from "vue";

const admin_path = ref([
  {
    icon: '',
    title: 'Webmasters',
    value: 'webmasters',
    to: 'admin-webmasters',
  },
  {
    icon: '',
    title: 'Webmasters Request',
    value: 'webmasters-request',
    to: 'admin-webmasters-request',
  }
])

const webmaster_path = ref([
  {
    icon: '',
    title: 'Dashboard',
    value: 'dashboard',
    to: 'webmaster-dashboard',
  },
  {
    icon: '',
    title: 'Funnels',
    value: 'funnels',
    to: 'webmaster-funnels',
  },
  {
    icon: '',
    title: 'Tags',
    value: 'tags',
    to: 'webmaster-tags',
  },
  {
    icon: '',
    title: 'Profile',
    value: 'profile',
    to: 'webmaster-profile',
  }
])
</script>

<style scoped>

</style>