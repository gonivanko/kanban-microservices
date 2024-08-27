// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import Dashboard from '../components/Dashboard.vue';
import { getCurrentUser } from '../services/authService';

const routes = [
    {
        path: '/login',
        component: Login
    },
    {
        path: '/register',
        component: Register
    },
    {
        path: '/dashboard',
        component: Dashboard,
        beforeEnter: (to, from, next) => {
            if (!getCurrentUser()) {
                next('/login');
            } else {
                next();
            }
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
