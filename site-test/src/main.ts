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
        SDK_APP_ID: '9becfaab-b015-4bfe-957b-b377b540c1ce',
        SDK_APP_SECRET: 'b76099d9-1b92-4d89-b9ee-479983e96e85',
        SDK_API_URL: 'http://localhost:3000/api/events',
        IDLE_TIMEOUT: 5 * 60 * 1000,
    },
    {
        trackMouse: [
            '/',
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
