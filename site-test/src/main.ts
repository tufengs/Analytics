import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import SDK from 'vue-sdk-analytics'

const app = createApp(App)

app.use(createPinia())

app.use(SDK, router, {
    SDK_APP_ID: '52915a91-cee2-4209-80cc-0667c44c439e',
    SDK_API_URL: 'http://localhost:3000',
    IDLE_TIMEOUT: 5 * 60 * 1000,
})

app.use(router)

app.mount('#app')
