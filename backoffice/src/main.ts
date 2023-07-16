import './assets/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import 'mosha-vue-toastify/dist/style.css'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faChartPie, faArrowRight, faUser, faChartArea, faChartBar, faChartLine, faClipboard } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faChartPie, faArrowRight, faUser, faChartArea, faChartBar, faChartLine, faClipboard)

const vuetify = createVuetify({
    components,
    directives,
})

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
