import { createApp } from 'vue'
import App from './App.vue'
import router from '@/routers'
import { createPinia } from 'pinia'
import 'virtual:uno.css'
import 'virtual:svg-icons-register'
import '@/styles/index.scss'


const pinia = createPinia()
const app = createApp(App)

app.use(pinia).use(router).mount('#app')
