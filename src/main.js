import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index.js'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { initNaiveUIDiscreteApi, initRuntimeData } from '@/utils/init.js'

async function init() {
  const app = createApp(App)

  const pinia = createPinia()
  pinia.use(piniaPluginPersistedstate)
  app.use(pinia)

  initNaiveUIDiscreteApi()
  try {
    await initRuntimeData()
  } catch (e) {
    console.error(e)
  }
  app.use(router)

  app.mount('#app')
}

init().then()
