import router from '@/router/index.js'

export function setupRouterRoutes(router) {
  console.log('setupRouterRoutes', router)
}

// TODO 处理无权限路由
export function removeUnauthorizedRoutes(menus) {
  const menuNameSet = menus.reduce((set, menu) => {
    if (menu.type === 'ROUTE') {
      set.add(menu.target)
    }
    return set
  }, new Set())
  const routes = router.getRoutes()
  routes.forEach((route) => {
    if (route.name && !menuNameSet.has(route.name)) {
      router.removeRoute(route.name)
    }
  })
}
