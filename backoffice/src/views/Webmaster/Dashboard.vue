<template>
  <div class="w-full">
    <div class="text-2xl p-4 font-bold">
      Dashboard
    </div>
    <div class="flex flex-col px-4">
      <v-select :items="items" density="compact" variant="outlined"></v-select>
      <div class="flex h-full gap-4 items-center">
        <v-text-field v-model="title" density="compact" variant="outlined" hide-details></v-text-field>
        <v-btn variant="outlined" class="h-full" @click="handleCreateDashboard">
          new dashboard
        </v-btn>
      </div>
    </div>
    <div class="p-4 w-full flex flex-wrap gap-4">
      <heatmap class="w-1/2 h-96" :data="[
        { x: 50, y: 50, value: 19 }, //1
        { x: 50, y: 50, value: 10 }, //2
        // Add more data points as needed
      ]"></heatmap>
      <graph class="w-1/2" />
      <k-p-i class="w-1/2" />
      <v-dialog v-model="dialog" width="auto">
        <template v-slot:activator="{ props }">
          <div
            class="w-1/2 h-96 border-2 rounded border-black flex items-center justify-center hover:bg-neutral-200 cursor-pointer"
            v-bind="props">
            Open Dialogezaea
          </div>
        </template>

        <v-card>
          <v-card-text>
            <v-text-field v-model="height" type="number" label="width"></v-text-field>
            <v-text-field v-model="width" type="number" label="height"></v-text-field>
            <v-select v-model="dashboard_type" label="type" :items="items"></v-select>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" block @click="handleAddDashboardElement()">Add</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import Heatmap from "@/components/Heatmap.vue";
import Graph from "@/components/Graph.vue";
import KPI from "@/components/KPI.vue";
import { useDashboardStore } from "@/stores/dashboard";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { DashboardType } from "@/interfaces/dashboard";
import { createToast } from "mosha-vue-toastify";

const dashboardStore = useDashboardStore()
const { dashboard, dashboards } = storeToRefs(dashboardStore)
const { findDashboards, createDashboard, addDashboardElement } = dashboardStore
const dialog = ref(false)

const items = ref([{
  title: 'Heatmap',
  value: 'HEATMAP',
},
{
  title: 'Chart',
  value: 'CHART',
},
{
  title: 'Graph',
  value: 'GRAPH',
}])
const title = ref('')
const dashboard_type = ref('')
const height = ref('')
const width = ref('')
const handleCreateDashboard = async () => {
  await createDashboard(title.value)
  title.value = ''
}

const handleAddDashboardElement = async () => {
  if (!title ||
    !dashboard_type ||
    !height ||
    !width ||
    !dashboard.value?.id ||
  )
    return createToast('Please fill all fields', { type: 'danger' })

  await addDashboardElement({
    dashboard_id: dashboard.value.id,
    dashboard_type: dashboard_type.value,
    position: dashboard.value?.dashboard_elements?.length ? dashboard.value?.dashboard_elements?.length + 1 : 0,
    height: +height.value,
    width: +width.value
  })

  dashboard_type.value = ''
  height.value = ''
  width.value = ''
}

onMounted(async () => {
  await findDashboards()
})
</script>

<style scoped></style>
