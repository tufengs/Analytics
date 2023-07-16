import {createRouter, createWebHistory} from 'vue-router'
import {useUserStore} from "@/stores/user";
import {token} from "@/service/axios";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: {name: 'session-login'}
    },
    {
      path: '/session',
      name: 'session',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Session.vue'),
      children: [
        { path: 'login', name: 'session-login', component: () => import('../views/Session/Login.vue')},
        { path: 'register', name: 'session-register', component: () => import('../views/Session/Register.vue')},
        { path: 'password-forgot', name: 'session-password-forgot', component: () => import('../views/Session/PasswordForgot.vue')}
      ],
      meta: {
        requireAuth: false,
        adminRequired: false,
        webmasterRequired: false,
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/Admin.vue'),
      redirect: {name: 'admin-webmasters'},
      children: [
        { path: 'webmasters', name: 'admin-webmasters', component: () => import('../views/Admin/WebMasterList.vue')},
        { path: 'webmasters/request', name: 'admin-webmasters-request', component: () => import('../views/Admin/WebMasterRequest.vue')},
      ],
      meta: {
        requireAuth: true,
        adminRequired: true,
        webmasterRequired: false,
      }
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
        { path: 'credentials', name: 'webmaster-credentials', component: () => import('../views/Webmaster/Credentials.vue')},
      ],
      meta: {
        requireAuth: true,
        adminRequired: false,
        webmasterRequired: true,
      }
    },
    {
      path: "/:pathMatch(.*)*",
      component: () => import("@/views/NotFound.vue"),
      meta: {
        requireAuth: false,
        adminRequired: false,
        webmasterRequired: false,
      }
    },
  ]
})

router.beforeEach(async (to: any, from: any, next: any) => {
  const userStore = useUserStore()
  const { profile, isWebmaster, isAdmin} = userStore
  const { adminRequired, webmasterRequired, requireAuth } = to?.meta;

  if (requireAuth) {
    if (token.value) {
      try {
        await profile()

        if (adminRequired) {
          if(isAdmin()) {
            next()
          } else if (isWebmaster()) {
            next({name: 'webmaster'})
          } else {
            next({name: 'session-login'})
          }
        } else if (webmasterRequired) {
          if (isWebmaster()) {
            next()
          } else if (isAdmin()) {
            next({name: 'admin'})
          } else {
            next({name: 'session-login'})
          }
        } else {
          next()
        }
      } catch (e) {
        next({name: 'session-login'})
      }
    } else {
      next({name: 'session-login'})
    }
  } else {
    if (token.value) {
      try {
        await profile()
      } catch (e) {
        console.error(e)
      }
    }
    next()
  }
})

export default router
