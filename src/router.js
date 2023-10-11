import {createRouter,createWebHistory} from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import About from "./views/About.vue";
import Contact from "./views/Contact.vue";
import Influencers from "./views/Influencers.vue";
import Forget from "./views/Forget.vue";
import Reset from "./views/Reset.vue";
import Dashboard from "./views/Dashboard.vue";
import Profile from "./views/Profile.vue";
import NotFound from "./views/NotFound.vue";

export const MY_URL = 'http://127.0.0.1:8000';

const routes = [
    {
        name: 'Home',
        path: '/',
        component: Home
    },
    {
        name: 'Influncers',
        path: '/influencers',
        component: Influencers
    },
    {
        name: 'About Us',
        path: '/about-us',
        component: About
    },
    {
        name: 'Contact Us',
        path: '/contact',
        component: Contact
    },
    {
        name: 'Se Connecter',
        path: '/login',
        component: Login
    },
    {
        name: 'S\'inscrire',
        path: '/register',
        component: Register
    },
    {
        name: 'Forget',
        path: '/forget-password',
        component: Forget
    },

    {
        name: 'Reset',
        path: '/reset-password/:token',
        component: Reset
    },

    {
        name: 'Dashboard',
        path: '/dashboard',
        component: Dashboard
    },

    {
        name: 'Profile',
        path: '/profile/:username',
        component: Profile
    },
    {
        path: '/404', name: 'NotFound', component: NotFound
    },
    {
        path: '/:catchAll(.*)', redirect:'404'
    }

]

export const router = createRouter({
    history: createWebHistory(),
    routes
})