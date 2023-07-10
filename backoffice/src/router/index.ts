import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '',
      name: 'session',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Session.vue'),
      children: [
        { path: '/login', name: 'session-login', component: () => import('../views/Session/Login.vue')},
        { path: '/register', name: 'session-register', component: () => import('../views/Session/Register.vue')},
        { path: '/paswword-forgot', name: 'session-password-forgot', component: () => import('../views/Session/PasswordForgot.vue')}
      ]
    }
  ]
})

export default router
