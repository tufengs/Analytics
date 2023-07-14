import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { clientWithoutAuth, client, token } from "@/service/axios"
import type { CreateUserI, LoginUserI, PasswordForgotUserI, UserI} from "@/interfaces/user";
export const useUserStore = defineStore('user', () => {

  const currentUser = ref<UserI>()
  const user = ref<UserI>()
  const users = ref<UserI[]>()

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

  const passwordForgot = async (payload: PasswordForgotUserI) => {
    try {
      await clientWithoutAuth.post('', payload)
    } catch ( error ) {
      throw error;
    }
  }

  return { currentUser, user, users, login, register, passwordForgot, profile }
})
