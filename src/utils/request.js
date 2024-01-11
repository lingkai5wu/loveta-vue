import router from '@/router'
import { useTokenStore } from '@/stores/token'
import axios from 'axios'

const baseURL = '/api'
const instance = axios.create({ baseURL })
const errMsg = '服务异常'

instance.interceptors.request.use((config) => {
  const tokenStore = useTokenStore()
  if (tokenStore.value) {
    config.headers[tokenStore.name] = tokenStore.value
  }
  return config
})

instance.interceptors.response.use(
  (result) => {
    if (result.data.code === 200) {
      return result.data
    }

    if (result.data.code === 401) {
      const tokenStore = useTokenStore()
      tokenStore.removeToken()
      router.push('/login')
    }
    window.$message.error(result.data.msg || errMsg)
    window.$loading.error()
    return Promise.reject(result.data)
  },
  (err) => {
    window.$message.error(errMsg)
    window.$loading.error()
    return Promise.reject(err)
  }
)

export default instance
