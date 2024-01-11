import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const currentUserVO = ref()
  return {
    currentUserVO
  }
})
