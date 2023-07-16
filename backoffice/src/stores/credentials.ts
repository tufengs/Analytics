import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {client} from "@/service/axios";
import type {CreateCredentialI, CredentialI} from "@/interfaces/credential";

export const useCredentialsStore = defineStore('credentials', () => {
  const credentials = ref([])

  const createCredential = async (payload: CreateCredentialI) => {
    try {
      const res = await client.post(`/credentials`, payload)
      return res.data;
    } catch ( error ) {
      throw error;
    }
  }

  const findCredentials = async () => {
    try {
      const res = await client.get(`/credentials`)
      credentials.value = res.data;
    } catch ( error ) {
      throw error;
    }
  }

  const removeCredential = async (id: string) => {
    try {
      const res = await client.delete(`/credentials/${id}`)
      credentials.value.filter((credential: CredentialI) => credential.id !== res.id);

    } catch ( error ) {
      throw error;
    }
  }

  return {credentials, createCredential, findCredentials, removeCredential }
})
