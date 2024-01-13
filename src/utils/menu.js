import router from '@/router'

export function generateMenuOptions(menus, pid = 0) {
  const routeList = router.getRoutes()
  const menuOptions = []
  for (const menu of menus) {
    if (menu.pid === pid) {
      let curMenu = { ...menu }
      if (menu.type === 'ROUTE') {
        const curRoute = routeList.find((route) => route.name === menu.target)
        if (curRoute) {
          curMenu = {
            ...menu,
            ...curRoute.meta,
            path: curRoute.path
          }
        }
      }
      const curMenuChildren = generateMenuOptions(menus, menu.id)
      if (curMenuChildren.length > 0) {
        curMenu.children = curMenuChildren
      }
      menuOptions.push(curMenu)
    }
  }
  return menuOptions
}
