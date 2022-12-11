import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./index.js"
import store from './store'  //import store.js page


createApp(App).use(router).use(store).mount('#app')

