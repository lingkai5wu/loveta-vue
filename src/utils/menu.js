import router from '@/router'

export function removeUnauthorizedRoutes(menus) {
  const set = new Set(menus.map((menu) => menu.name))
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
      const curRoute = routes.find((route) => route.name === menu.name)
      if (curRoute) {
        curMenu = {
          ...menu,
          ...curRoute.meta,
          path: curRoute.path
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
