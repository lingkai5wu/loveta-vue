import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const info = ref(null)

  return {
    info
  }
})
