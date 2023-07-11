import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {CreateUserI, LoginUserI, PasswordForgotUserI, UserI} from "@/interfaces/user";

export const useUserStore = defineStore('user', () => {
  const user = ref<UserI>()
  const users = ref<UserI[]>()

  const login = async (payload: LoginUserI) => {

  }

  const register = async (payload: CreateUserI) => {

  }

  const passwordForgot = async (payload: PasswordForgotUserI) => {

  }

  return { user, users, login, register, passwordForgot }
})
