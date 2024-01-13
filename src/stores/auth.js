import { defineStore } from 'pinia'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const token = ref()
    return {
      token
    }
  },
  {
    persist: true
  }
)