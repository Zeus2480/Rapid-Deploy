import { createApp } from 'vue'
import '@mdi/font/css/materialdesignicons.css'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import "./style.css"
import store from './store'
import router from "./router"
import axiosInstance from './plugins/axios'  // Ensure this points to your axios configuration file

const app = createApp(App).use(store)
app.config.globalProperties.$axios = axiosInstance

app.use(vuetify)
app.use(router)
app.mount('#app')