import { defineStore } from 'pinia'
import { generateMenuOptions } from '@/utils/menu.js'

export const useMenuStore = defineStore('menu', () => {
  const menuOptions = ref()

  function setMenuOptions(menus) {
    menuOptions.value = generateMenuOptions(menus)
  }

  return {
    menuOptions,
    setMenuOptions
  }
})
