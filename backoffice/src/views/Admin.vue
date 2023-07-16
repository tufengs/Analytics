<template>
  <div class="flex pl-64 tw-pt-64">
    <sidebar />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import Sidebar from "@/components/structure/Sidebar.vue";
</script>
