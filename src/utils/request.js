import router from '@/router'
import { useTokenStore } from '@/stores/token'
import axios from 'axios'
import { createDiscreteApi } from 'naive-ui'

const baseURL = '/api'
const instance = axios.create({ baseURL })
const errMsg = '服务异常'

const { message } = createDiscreteApi(['message'])

instance.interceptors.request.use(
  (config) => {
    const tokenStore = useTokenStore()
    if (tokenStore.value) {
      config.headers[tokenStore.name] = tokenStore.value
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

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
    message.error(result.data.msg || errMsg)
    return Promise.reject(result.data)
  },
  (err) => {
    message.error(errMsg)
    return Promise.reject(err)
  }
)

export default instance
