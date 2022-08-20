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
  },
  {
    path: '/dashboard/:token',
    name: 'Dashboard',
    component: () => import('../components/Dashboard.vue')
  },
  {
    path: '/editar-bebida/:id',
    name: 'EditarBebida',
    component: () => import('../components/bebidas/EditarBebida.vue')
  },
  {
    path: '/editar-lanche/:id',
    name: 'EditarLanche',
    component: () => import('../components/lanches/EditarLanche.vue')
  },
  {
    path: '/editar-usuario/:id',
    name: 'EditarUsuario',
    component: () => import('../components/usuarios/EditarUsuario.vue')
  },
  {
    path: '/ver-pedido/:id',
    name: 'VerPedido',
    component: () => import('../components/pedidos/VerPedido.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
