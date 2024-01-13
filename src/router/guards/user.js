import { useUserStore } from '@/stores/user.js'
import { getCurrentUserVO } from '@/api/user.js'

export function createUserGuard(router) {
  router.beforeEach(() => {
    const userStore = useUserStore()
    if (!userStore.currentUserVO) {
      getCurrentUserVO().then((result) => {
        userStore.currentUserVO = result.data
      })
    }
    return true
  })
}
