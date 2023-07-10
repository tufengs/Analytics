import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import VueSDKAnlaytics from 'vue-sdk-analytics'

const app = createApp(App)

app.use(createPinia())
app.use(VueSDKAnlaytics, {
    apiURL: 'http://localhost:3000',
    apiKey: '1234567890',
})
app.use(router)

app.mount('#app')
