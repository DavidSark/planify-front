import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import AjouterDevoir from '../views/AjouterDevoir.vue'
import MesDevoirs from '../views/MesDevoirs.vue'


const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/admin', component: AdminDashboard, meta: { requiresAuth: true } },
{ path: '/ajouter', component: AjouterDevoir, meta: { requiresAuth: true } },
  { path: '/mes-devoirs', component: MesDevoirs, meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')

  if (to.meta.requiresAuth) {
    if (!token) {
      return next('/login')
    }

    // Protection route admin : seuls les rôles autorisés peuvent y aller
    if (to.path === '/admin' && !['superadmin', 'delegue', 'prof'].includes(role)) {
      return next('/mes-devoirs') // ou '/login'
    }

    return next()
  }

  next()
})

export default router
