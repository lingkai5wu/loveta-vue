import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const userVO = ref()

  function setUserVO(userVO) {
    this.userVO = userVO
  }

  return {
    userVO,
    setUserVO
  }
})
