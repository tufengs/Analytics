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
        SDK_APP_ID: '586f7e35-48e9-435f-8249-580660b1800b',
        SDK_APP_SECRET: '8f1f6f23-e7fa-4a86-9e16-e5d7dbfc9fc8',
        SDK_API_URL: 'http://localhost:3000/api/events',
        IDLE_TIMEOUT: 5 * 60 * 1000,
    },
    {
        trackMouse: [
            '/about',
            '/settings',
        ],
        trackChange: [
            {
                'to': '/404',
                'tag': '64b440c6d4bee49d38e2aff4',
            },
            {
                'to': '/about',
                'tag': '64b440c1d4bee49d38e2aff2',
            },
            {
                'to': '/',
                'tag': '64b440bad4bee49d38e2aff0',
            },
        ]
    }
)

app.use(router)

app.mount('#app')
