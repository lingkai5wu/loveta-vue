import { createLoadingBarGuard } from '@/router/guards/loading-bar.js'
import { createAuthGuard } from '@/router/guards/auth.js'
import { createPageTitleGuard } from '@/router/guards/title.js'
import { createUserGuard } from '@/router/guards/user.js'
import { createMenuGuard } from '@/router/guards/menu.js'

export function setupRouterGuards(router) {
  createAuthGuard(router)
  createLoadingBarGuard(router)
  createMenuGuard(router)
  createPageTitleGuard(router)
  createUserGuard(router)
}
