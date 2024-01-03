import router from '@/router'
import request from '@/utils/request'

function removeUnauthorizedRoutes(set) {
  const routes = router.getRoutes()
  routes.forEach((item) => {
    if (item.name && !set.has(item.name)) {
      router.removeRoute(item.name)
    }
  })
}

function buildMenuTree(menus, pid = 0) {
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

export async function fetchMenuAndRemoveUnauthorizedRoutes() {
  const result = await request.get('/menu')
  const menuNameSet = new Set(result.data.map((item) => item.name))
  removeUnauthorizedRoutes(menuNameSet)
  return buildMenuTree(result.data)
}
