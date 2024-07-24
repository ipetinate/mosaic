import { router } from './router'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { VueQueryPlugin } from '@tanstack/vue-query'
import { vueQueryConfig } from './constants/vue-query'

import App from './App.vue'

import './styles/global.scss'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(VueQueryPlugin, vueQueryConfig)

app.mount('#app')
