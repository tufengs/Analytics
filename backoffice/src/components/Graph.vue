<template>
  <bar :data="data" :options="options"/>
</template>

<script setup lang="ts">
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar, Line } from 'vue-chartjs'
import { defineProps } from 'vue'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const props = defineProps({
  data: {
    type: Object,
    default: {
      labels: ['January', 'February', 'March'],
      datasets: [{ data: [40, 20, 12] }]
    }
  },
  options: {
    type: Object,
    default: {
      responsive: true
    }
  }
})
</script>