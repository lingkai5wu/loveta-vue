import request from '@/utils/request.js'

export async function getUser() {
  return await request.get('/user')
}

export async function listUsers() {
  return await request.get('/user/list')
}
