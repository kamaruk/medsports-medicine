import { registerPlugins } from '@/plugins'
import App from './App.vue'
import { createApp } from 'vue'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import 'unfonts.css'

const app = createApp(App)

registerPlugins(app)

app.mount('#app')

