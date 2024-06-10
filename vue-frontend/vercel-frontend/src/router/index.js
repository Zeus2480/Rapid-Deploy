import { createWebHistory, createRouter } from 'vue-router'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import Dashboard from '../pages/Dashboard.vue'
import Project from '../pages/Project.vue'

const routes = [
    { path: '/', redirect: '/dashboard' },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    {
        path: '/dashboard', component: Dashboard, meta: {
            requiresAuth: true
        }
    },
    {
        path: '/project/:id', component: Project, meta: {
            requiresAuth: true
        }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

// Add the navigation guard
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !localStorage.getItem('auth_token')) {
        next('/login')  // Redirect to login page if not authenticated
    } else {
        next()  // Proceed to the route if authenticated or if authentication is not required
    }
})

export default router
