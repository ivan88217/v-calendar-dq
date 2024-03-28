import Calendar from './components/Calendar.vue';
import type { App } from 'vue';

export default {
    install: (app: App) => {
        app.component('Calendar', Calendar);
    },
};
