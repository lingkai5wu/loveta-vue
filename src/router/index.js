import { createRouter, createWebHistory } from 'vue-router'
import BaseLayout from '@/views/BaseLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: BaseLayout,
      children: [
        {
          path: '/hello',
          name: 'hello',
          component: () => import('@/views/HelloView.vue')
        }
      ]
    }
  ]
})

export default router
