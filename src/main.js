import { createApp } from 'vue';
import {router} from "./router.js";
import App from './App.vue';
import {store} from "./store.js";

// Start Assets
import './style.css';
import "./assets/js/bootstrap.bundle.min.js";


// Start App
const app = createApp(App);

app.use(router);
app.use(store);
app.mount('#app')
