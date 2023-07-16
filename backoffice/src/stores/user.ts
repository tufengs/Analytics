import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { clientWithoutAuth, client, token } from "@/service/axios"
import type {CreateUserI, LoginUserI, PasswordForgotUserI, UpdateUserI, UserI} from "@/interfaces/user";
import {useRouter} from "vue-router";
export const useUserStore = defineStore('user', () => {

  const currentUser = ref<UserI>()
  const user = ref<UserI>()
  const users = ref<UserI[]>()

  const isAdmin = (): boolean => {
    if (currentUser.value) {
      return currentUser.value.role === 'ADMIN'
    } else {
      return false
    }
  }

  const isWebmaster = (): boolean => {
    if (currentUser.value) {
      return currentUser.value.role === 'WEBMASTER'
    } else {
      return false
    }
  }

  const login = async (payload: LoginUserI): Promise<any> => {
    try {
      const res = await clientWithoutAuth.post('/auth/login', payload)
      token.value = res.data.access_token;
      await profile();
      return res.data;
    } catch ( error ) {
      throw error;
    }
  }

  const profile = async (): Promise<any> => {
    try {
      const res = await client.get('/auth/profile')
      currentUser.value = res.data;
      return res.data;
    } catch ( error ) {
      throw error;
    }
  }

  const register = async (payload: CreateUserI): Promise<any> => {
    try {
      const res = await clientWithoutAuth.post('/auth/signup', payload)
      currentUser.value = res.data;
    } catch ( error ) {
      throw error;
    }
  }

  const logout = (): void => {
    token.value = null
    currentUser.value = undefined
  }

  const updateCurrentUser = async (payload: UpdateUserI): Promise<void> => {
    try {
      const res = await clientWithoutAuth.patch(`/users`, payload)
      user.value = res.data
    } catch ( error ) {
      throw error;
    }
  }

  const updateUser = async (payload: UpdateUserI, user_id: string): Promise<void> => {
    try {
      const res = await clientWithoutAuth.patch(`/users/${user_id}`, payload)
      user.value = res.data
    } catch ( error ) {
      throw error;
    }
  }

  const passwordForgot = async (payload: PasswordForgotUserI) => {
    try {
      await clientWithoutAuth.post('', payload)
    } catch ( error ) {
      throw error;
    }
  }

  return { currentUser, user, users, login, register, logout, passwordForgot, profile, isAdmin, isWebmaster }
})
