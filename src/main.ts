import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue';
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';

const pinia = createPinia()

createApp(App)
    .use(pinia)
    .use(VCalendar, {})
    .mount('#app')
