import { useAuthStore } from '@/stores/auth.js'

const PATH_WHITE_LIST = ['/login', '/404']

export function createAuthGuard(router) {
  router.beforeEach(async (to) => {
    if (to.path in PATH_WHITE_LIST) {
      return true
    }

    const authStore = useAuthStore()
    if (!authStore.token) {
      return '/login'
    }
    if (to.path === '/login') {
      return '/'
    }
  })
}
