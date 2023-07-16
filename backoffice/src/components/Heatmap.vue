<template>
  <div class="border-2 border-opacity-100 border-black rounded">
    <div ref="heatmapContainer"
         :style="`width: ${width}px; height: ${height}px;`"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue';
import Heatmap from 'heatmap-ts';

const heatmapContainer = ref(null);
const props = defineProps({
  data: {
    type: Array(Object),
    required: true
  },
  max: {
    type: Number,
    default: 100
  },
  height: {
    type: Number,
    default: 300,
  },
  width: {
    type: Number,
    default: 400
  },
})

onMounted(() => {
  const heatmapInstance = new Heatmap({
    container: heatmapContainer.value,
  });

  const data = props.data

  heatmapInstance.setData({
    max: props.max, // Maximum value in the data
    data   // Data array
  });
})
</script>
