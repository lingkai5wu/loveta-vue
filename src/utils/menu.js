import router from '@/router'

export function removeUnauthorizedRoutes(menus) {
  const set = menus.reduce((set, obj) => {
    if (obj.type === 'ROUTE') {
      set.add(obj.data)
    }
    return set
  }, new Set())
  const routes = router.getRoutes()
  routes.forEach((item) => {
    if (item.name && !set.has(item.name)) {
      router.removeRoute(item.name)
    }
  })
}

export function buildMenuTree(menus, pid = 0) {
  const routes = router.getRoutes()
  const result = []
  for (const menu of menus) {
    if (menu.pid === pid) {
      let curMenu = { ...menu }
      if (menu.type === 1) {
        const curRoute = routes.find((route) => route.name === menu.data)
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
