import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { clientWithoutAuth, client, token, tokenAsAdmin } from "@/service/axios"
import type {CreateDashboardElementI, DashboardI} from "@/interfaces/dashboard";

export const useDashboardStore = defineStore('dashboard', () => {

  const dashboard = ref<DashboardI>()
  const dashboards = ref<DashboardI[]>([])

  const createDashboard = async (title: string) => {
    try {
      const res = await client.post(`/dashboard`, {title: title})
      dashboard.value = res.data;
    } catch ( error ) {
      throw error;
    }
  }

  const findDashboards = async () => {
    try {
      const res = await client.get(`/dashboard`)
      dashboards.value = res.data;
    } catch ( error ) {
      throw error;
    }
  }

  const findDashboard = async (id: string) => {
    try {
      const res = await client.get(`/dashboard/${id}`)
      dashboard.value = res.data;
    } catch ( error ) {
      throw error;
    }
  }

  const addDashboardElement = async (payload: CreateDashboardElementI) => {
    try {
      const res = await client.post(`/dashboard_element`, payload)
      dashboard.value?.dashboard_elements.push(res.data)
    } catch (error) {
      throw error;
    }
  }

  return {dashboard, dashboards, createDashboard, findDashboard, findDashboards, addDashboardElement}
})
