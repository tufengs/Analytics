import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import Admin from "@/views/Admin.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue'),
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
        { path: '/password-forgot', name: 'session-password-forgot', component: () => import('../views/Session/PasswordForgot.vue')}
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/Admin.vue'),
      redirect: {name: 'admin-webmasters'},
      children: [
        { path: 'webmasters', name: 'admin-webmasters', component: () => import('../views/Admin/WebMasterList.vue')},
        { path: 'webmasters/request', name: 'admin-webmasters-request', component: () => import('../views/Admin/WebMasterRequest.vue')},
      ]
    },
    {
      path: '/webmaster',
      name: 'webmaster',
      component: () => import('../views/Webmaster.vue'),
      redirect: {name: 'webmaster-dashboard'},
      children: [
        { path: '', name: 'webmaster-dashboard', component: () => import('../views/Webmaster/Dashboard.vue')},
        { path: 'funnels', name: 'webmaster-funnels', component: () => import('../views/Webmaster/Funnels.vue')},
        { path: 'tags', name: 'webmaster-tags', component: () => import('../views/Webmaster/Tags.vue')},
        { path: 'profile', name: 'webmaster-profile', component: () => import('../views/Webmaster/Profile.vue')},
      ]
    },
    {
      path: "/:pathMatch(.*)*",
      component: () => import("@/views/NotFound.vue"),
    },
  ]
})

export default router
