<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HeaderC from './components/Header.vue';
import ImpersonateBar from "@/components/structure/ImpersonateBar.vue";
</script>

<template>
  <div class="h-screen">
    <HeaderC></HeaderC>
    <RouterView class="pt-5" />
    <impersonate-bar/>
  </div>
</template>
