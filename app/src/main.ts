import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from '@/router'

import App from './App.vue'

import { VueQueryPlugin } from '@tanstack/vue-query'

import './scss/main.scss'
const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(VueQueryPlugin)

app.mount('#app')
