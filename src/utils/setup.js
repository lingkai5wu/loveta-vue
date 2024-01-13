import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { setupRouterRoutes } from '@/utils/route.js'
import { setupRouterGuards } from '@/router/guards/index.js'
import router from '@/router/index.js'

export function setupStore(app) {
  const pinia = createPinia()
  pinia.use(piniaPluginPersistedstate)
  app.use(pinia)
}

export function setupRouter(app) {
  setupRouterRoutes(router)
  setupRouterGuards(router)
  app.use(router)
}
