<template>
  <div>
    <div ref="heatmapContainer" style="width: 400px; height: 300px;"></div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import Heatmap from 'heatmap-ts';

export default {
  setup() {
    const heatmapContainer = ref(null);

    onMounted(() => {
      const heatmapInstance = new Heatmap({
        container: heatmapContainer.value,
      });

      // Generate sample data
      const data = [
        { x: 50, y: 50, value: 19 }, //1
        { x: 50, y: 50, value: 10 }, //2
        // Add more data points as needed
      ];

      heatmapInstance.setData({
        max: 250, // Maximum value in the data
        data,    // Data array
      });
    });

    return {
      heatmapContainer,
    };
  },
};
</script>

<style scoped>
/* Add any necessary styling for the heatmap container */
.heatmap-container {
  width: 100%;
  height: 100%;
}
</style>
