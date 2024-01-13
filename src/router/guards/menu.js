import { useMenuStore } from '@/stores/menu.js'

export function createMenuGuard(router) {
  router.beforeResolve(async () => {
    await useMenuStore().setupMenuOptions(false)
  })
}
