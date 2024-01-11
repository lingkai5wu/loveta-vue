import request from '@/utils/request.js'

export async function login(data) {
  return await request.post('/auth/login', data)
}

export async function register(data) {
  return await request.post('/auth/register', data)
}
