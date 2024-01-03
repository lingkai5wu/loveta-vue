import { defineStore } from 'pinia'

export const useTokenStore = defineStore(
  'token',
  () => {
    const name = ref()
    const value = ref()

    function setToken(data) {
      name.value = data.tokenName
      value.value = data.tokenValue
    }

    function removeToken() {
      name.value = null
      value.value = null
    }

    return {
      name,
      value,
      setToken,
      removeToken
    }
  },
  {
    persist: true
  }
)
