import BaseLayout from '@/views/BaseLayout.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { setupRouterGuards } from '@/router/guards/index.js'
import { setupRouterRoutes } from '@/utils/route.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: BaseLayout,
      // 路由硬编码使用 name
      redirect: { name: 'dashboard' },
      children: [
        {
          path: '/dashboard',
          // 控制权限需设置 name
          name: 'dashboard',
          component: () => import('@/views/BaseDashboard.vue')
        },
        {
          path: '/menu',
          name: 'menu',
          component: () => import('@/views/MenuList.vue')
        },
        {
          path: '/test',
          name: 'test',
          component: () => import('@/views/TestView.vue')
        },
        {
          path: '/user',
          name: 'user',
          component: () => import('@/views/UserList.vue')
        }
      ]
    },
    {
      path: '/login',
      component: () => import('@/views/LoginView.vue')
    }
  ]
})

export function setupRouter(app) {
  setupRouterRoutes(router)
  setupRouterGuards(router)
  app.use(router)
}

export default router
