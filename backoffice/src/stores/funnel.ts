import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { client } from '@/service/axios'

export const useFunnelStore = defineStore('funnel', () => {

  const funnels = ref([]);

  const getFunnels = async () => {
    try {
      const res = await client.get('/funnel');
      funnels.value = res.data;
    } catch (error) {
      throw error;
    }
  }

  const createFunnel = async (funnel: { tags: string[] }) => {
    try {
      const res = await client.post('/funnel', funnel);
      // @ts-ignore
      funnels.value.push(res.data);
    } catch (error) {
      throw error;
    }
  }

  return { getFunnels, createFunnel, funnels }
})
