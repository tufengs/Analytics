<template>
  <div class="flex pl-64 pt-64">
    <sidebar />
    <div class="w-full px-5">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from "@/components/structure/Sidebar.vue";
</script>
