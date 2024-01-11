import router from '@/router'

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

export function buildMenuTree(menus, pid = 0) {
  const routes = router.getRoutes()
  const result = []
  for (const menu of menus) {
    if (menu.pid === pid) {
      let curMenu = { ...menu }
      if (menu.type === 'ROUTE') {
        const curRoute = routes.find((route) => route.name === menu.target)
        if (curRoute) {
          curMenu = {
            ...menu,
            ...curRoute.meta,
            path: curRoute.path
          }
        }
      }
      const curItemChildren = buildMenuTree(menus, menu.id)
      if (curItemChildren.length > 0) {
        curMenu.children = curItemChildren
      }
      result.push(curMenu)
    }
  }
  return result
}
