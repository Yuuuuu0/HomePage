import { createApp } from 'vue'
import App from './App.vue'
import appConfig from './config/app.json'

document.title = appConfig.title || 'HomePage'

createApp(App).mount('#app')

