import { createApp } from 'vue';
import {router} from "./router.js";
import VueNextProgressbar from '@jambonn/vue-next-progressbar';
import '@jambonn/vue-next-progressbar/lib/vue-next-progressbar.min.css';
import App from './App.vue';
import {store} from "./store.js";

// Start Assets
import './style.css';
import "./assets/js/bootstrap.bundle.min.js";


// Start App
const app = createApp(App);

app.use(router);
app.use(store);
app.use(VueNextProgressbar, { routes: true });

app.mount('#app')