import request from '@/utils/request.js'

export async function listCurUserMenu() {
  return await request.get('/menu')
}

export async function listMenu() {
  return await request.get('/menu/list')
}

export async function saveMenu(menu) {
  return await request.post('/menu/save', menu)
}

export async function updateMenu(menu) {
  return await request.post('/menu/update', menu)
}

export async function removeMenu(id) {
  return await request.delete('/menu/remove/' + id)
}
