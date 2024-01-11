import request from '@/utils/request.js'

export async function getDirectPostObjectParam() {
  return await request.get('/oss/post')
}
