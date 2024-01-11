import { listCurrentUserMenus } from '@/api/menu.js'
import { useMenuStore } from '@/stores/menu.js'
import { useAuthStore } from '@/stores/auth.js'
import { buildMenuTree, removeUnauthorizedRoutes } from '@/utils/menu.js'
import BaseLayout from '@/views/BaseLayout.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user.js'
import { getCurrentUserVO } from '@/api/user.js'

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

export default router

router.beforeEach(async (to) => {
  // 进度条
  window.$loading.start()

  // 已登录时访问登录页，跳转到首页
  const authStore = useAuthStore()
  if (to.path === '/login' && authStore.token) {
    return '/'
  }

  // 无菜单时生成路由，副作用验证登录
  const menuStore = useMenuStore()
  if (menuStore.menuOptions.length === 0) {
    if (to.path === '/login') {
      window.$loading.finish()
      return true
    }
    const result = await listCurrentUserMenus()
    removeUnauthorizedRoutes(result.data)
    menuStore.menuOptions = buildMenuTree(result.data)
    // 想访问的路由可能被 remove
    if (!router.hasRoute(to.name)) {
      return to
    }
  }

  const userStore = useUserStore()
  if (!userStore.currentUserVO) {
    getCurrentUserVO().then((result) => {
      userStore.currentUserVO = result.data
    })
  }
  window.$loading.finish()
  return true
})
