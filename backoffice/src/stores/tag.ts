import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { client } from '@/service/axios'

export const useTagStore = defineStore('tag', () => {

  const tags = ref([]);

  const getTags = async () => {
    try {
      const res = await client.get('/tag');
      tags.value = res.data;
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  const createTag = async (tag: { comment: string }) => {
    try {
      const res = await client.post('/tag', tag);
      // @ts-ignore
      tags.value.push(res.data);
    } catch (error) {
      throw error;
    }
  }

  return { getTags, createTag, tags }
})
