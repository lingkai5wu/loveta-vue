import BaseLayout from '@/views/BaseLayout.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createLoadingBarGuard } from '@/router/guards/loading-bar.js'
import { createPageTitleGuard } from '@/router/guards/title.js'
import { createAuthGuard } from '@/router/guards/auth.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: BaseLayout,
      name: 'layout'
    },
    {
      path: '/login',
      component: () => import('@/views/LoginView.vue')
    }
  ]
})

createAuthGuard(router)
createLoadingBarGuard(router)
createPageTitleGuard(router)

export default router
