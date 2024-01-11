import request from '@/utils/request.js'

export async function listCurrentUserMenus() {
  return await request.get('/menu/current')
}

export async function listMenus() {
  return await request.get('/menu')
}

export async function saveMenu(menu) {
  return await request.post('/menu', menu)
}

export async function updateMenu(menu) {
  return await request.patch('/menu', menu)
}

export async function removeMenu(id) {
  return await request.delete('/menu/' + id)
}
