export function addRoutesFromMenus(router, currentUserMenus) {
  const routeComponents = import.meta.glob('@/views/**/*.vue')
  console.log(routeComponents)
  currentUserMenus.forEach((menu) => {
    if (menu.type === 'ROUTE') {
      if (router.hasRoute(menu.id)) {
        router.removeRoute(menu.id)
      }
      router.addRoute('layout', {
        name: menu.id,
        path: menu.path,
        component: routeComponents[menu.component],
        meta: {
          label: menu.label,
          icon: menu.icon
        }
      })
    }
  })
  console.log(router.getRoutes())
}
