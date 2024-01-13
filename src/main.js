import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter, setupStore } from '@/utils/setup.js'

const app = createApp(App)
setupStore(app)
setupRouter(app)

app.mount('#app')
