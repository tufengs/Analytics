import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { clientWithoutAuth } from "@/service/axios"
import type { CreateUserI, LoginUserI, PasswordForgotUserI, UserI} from "@/interfaces/user";

export const useUserStore = defineStore('user', () => {
  const currentUser = ref<UserI>()
  const user = ref<UserI>()
  const users = ref<UserI[]>()

  const login = async (payload: LoginUserI) => {
    try {
      const res = await clientWithoutAuth.post('', payload)
      currentUser.value = res.data
    } catch ( error ) {
      console.log(error)
    }
  }

  const register = async (payload: CreateUserI) => {
    try {
      const res = await clientWithoutAuth.post('', payload)
      currentUser.value = res.data
    } catch ( error ) {
      console.log(error)
    }
  }

  const passwordForgot = async (payload: PasswordForgotUserI) => {
    try {
      await clientWithoutAuth.post('', payload)
    } catch ( error ) {
      console.log(error)
    }
  }

  return { user, users, login, register, passwordForgot }
})
