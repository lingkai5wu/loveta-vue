export function generateMenuOptions(menus, pid = 0) {
  const menuOptions = []
  for (const menu of menus) {
    if (menu.pid === pid) {
      const children = generateMenuOptions(menus, menu.id)
      if (children.length > 0) {
        menu.children = children
      }
      menuOptions.push(menu)
    }
  }
  return menuOptions
}
