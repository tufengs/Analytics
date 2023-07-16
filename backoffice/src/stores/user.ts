import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { clientWithoutAuth, client, token, tokenAsAdmin } from "@/service/axios"
import type {CreateUserI, LoginUserI, PasswordForgotUserI, UpdateUserI, UserI} from "@/interfaces/user";
export const useUserStore = defineStore('user', () => {

  const currentUser = ref<UserI>()
  const currentUserAdmin = ref<UserI>()
  const user = ref<UserI>()
  const users = ref<UserI[]>([])

  const findUser = async (id: string) => {
    try {
      const res = await client.get(`/users/${id}`)
      user.value = res.data;
    } catch ( error ) {
      throw error;
    }
  }

  const findUsers = async () => {
    try {
      const res = await client.get(`/users`)
      users.value = res.data;
    } catch ( error ) {
      throw error;
    }
  }

  const findUsersRequest = async () => {
    try {
      const res = await client.get(`/users/request`)
      users.value = res.data;
    } catch ( error ) {
      throw error;
    }
  }

  const validateUser = async(id: string) => {
    try {
      const res = await client.get(`/users/${id}/validate`)
      return res.data
    } catch ( error ) {
      throw error;
    }
  }

  const impersonateUser = async(id: string) => {
    try {
      const res = await client.get(`/auth/impersonate/${id}`)
      tokenAsAdmin.value = token.value
      token.value = res.data.access_token
      currentUserAdmin.value = currentUser.value
      await profile()
    } catch (e) {
      throw e;
    }
  }

  const logoutImpersonateUser = async () => {
    try {
      token.value = tokenAsAdmin.value
      tokenAsAdmin.value = ''
      currentUserAdmin.value = null
      await profile()
    } catch (e) {
      throw e;
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

  return { currentUser, user, users, findUser, findUsers, findUsersRequest, updateUser, updateCurrentUser, validateUser, login, register, logout, passwordForgot, profile, isAdmin, isWebmaster, impersonateUser, logoutImpersonateUser }
})
