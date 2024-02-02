import { useMenuStore } from '@/stores/menu.js'
import { listCurrentUserMenus } from '@/api/menu.js'
import { getCurrentUserVO } from '@/api/user.js'
import { addRoutesFromMenus } from '@/utils/route.js'
import { useUserStore } from '@/stores/user.js'
import { useAuthStore } from '@/stores/auth.js'
import router from '@/router/index.js'
import { createDiscreteApi } from 'naive-ui'

export async function initRuntimeData() {
  if (!useAuthStore().token) {
    console.log(111)
    const route = unref(router.currentRoute)
    if (route.path !== '/login') {
      router.replace('/login')
    }
    return
  }

  useUserStore().setUserVO(await getCurrentUserVO())

  const userMenus = await listCurrentUserMenus()
  addRoutesFromMenus(router, userMenus)
  useMenuStore().setMenuOptions(userMenus)
}

export function initNaiveUIDiscreteApi() {
  const { message, dialog, notification, loadingBar } = createDiscreteApi([
    'message',
    'dialog',
    'notification',
    'loadingBar'
  ])
  window.$message = message
  window.$dialog = dialog
  window.$notification = notification
  window.$loadingBar = loadingBar
}
