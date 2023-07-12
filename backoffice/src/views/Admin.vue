<template>
  <div class="tw-flex tw-pl-64">
    <sidebar />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import Sidebar from "@/components/structure/Sidebar.vue";
</script>
