<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HeaderC from './components/Header.vue';
</script>

<template>
  <div class="h-screen">
    <HeaderC></HeaderC>
    <RouterView />
  </div>
</template>
