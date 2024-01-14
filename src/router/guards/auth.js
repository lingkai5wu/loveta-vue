import { useAuthStore } from '@/stores/auth.js'

const PATH_WHITE_LIST = ['/login', '/404']

export function createAuthGuard(router) {
  router.beforeEach((to) => {
    if (PATH_WHITE_LIST.includes(to.path)) {
      return true
    }

    if (!useAuthStore().token) {
      return '/login'
    }
    if (to.path === '/login') {
      return '/'
    }
  })
}
