import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import SDK from 'vue-sdk-analytics'

const app = createApp(App)

app.use(createPinia())

app.use(
    SDK,
    router,
    {
        SDK_APP_ID: '52915a91-cee2-4209-80cc-0667c44c439e',
        SDK_APP_SECRET: 'b2d2b2c0-0b1a-4b0e-8b0a-0b6b0b0b0b0b',
        SDK_API_URL: 'http://localhost:3000/api/events',
        IDLE_TIMEOUT: 5 * 60 * 1000,
    },
    {
        pages: [
            '/',
            '/about',
            /^\/article\/[^\/]+$/,
            '/settings',
        ]
    }
)

app.use(router)

app.mount('#app')
