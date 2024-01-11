import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu', () => {
  const menuOptions = ref([])
  return {
    menuOptions
  }
})
