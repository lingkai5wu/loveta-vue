import request from '@/utils/request.js'

export async function getCurrentUserVO() {
  return await request.get('/user/current')
}

export async function listUserVOs() {
  return await request.get('/user')
}
