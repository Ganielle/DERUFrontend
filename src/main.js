import 'mdb-vue-ui-kit/css/mdb.min.css'
import 'vue-toast-notification/dist/theme-sugar.css';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store/store'

createApp(App).use(router).use(store).mount('#app')
