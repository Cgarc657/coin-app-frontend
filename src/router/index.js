import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import LoginPage from '@/views/LoginPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'
import CoinDetailPage from '@/views/CoinDetailPage.vue'
import FavoritesPage from '@/views/FavoritesPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage,
  },
  {
    path: '/coin/:id',
    name: 'coin-detail',
    component: CoinDetailPage,
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: FavoritesPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
