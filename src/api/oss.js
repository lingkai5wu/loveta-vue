import request from '@/utils/request.js'

export async function getDirectPostObjectInfo() {
  return await request.get('/oss/post-info')
}
