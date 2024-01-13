import { defineStore } from 'pinia'
import { listCurrentUserMenus } from '@/api/menu.js'
import { generateMenuOptions } from '@/utils/menu.js'

export const useMenuStore = defineStore('menu', () => {
  const menuOptions = ref()

  async function setupMenuOptions(refresh = true) {
    if (!refresh && menuOptions.value) {
      return
    }
    menuOptions.value = generateMenuOptions((await listCurrentUserMenus()).data)
  }

  return {
    menuOptions,
    setupMenuOptions
  }
})
