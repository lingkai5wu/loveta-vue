export function addRoutesFromMenus(router, currentUserMenus) {
  const routeComponents = import.meta.glob('@/views/**/*.vue')
  console.log(routeComponents)
  currentUserMenus.forEach((menu) => {
    if (menu.type === 'ROUTE') {
      router.addRoute('layout', {
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
