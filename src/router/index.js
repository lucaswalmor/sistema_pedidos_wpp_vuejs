import { createRouter, createWebHistory } from 'vue-router'
import Pedido from '../views/Pedido.vue'

const routes = [
  {
    path: '/',
    name: 'Pedido',
    component: Pedido
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/Admin.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
