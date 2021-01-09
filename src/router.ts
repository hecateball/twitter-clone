import { createRouter, createWebHistory, NavigationGuard } from 'vue-router'
import firebase from 'firebase/app'
import 'firebase/auth'

const requireAuthentication: NavigationGuard = async (to, from, next) => {
  const currentUser = await new Promise<firebase.User | null>((resolve) => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      unsubscribe()
      resolve(user)
    })
  })
  if (currentUser === null) {
    next({ name: 'sign-in' })
    return
  }
  next()
}

export const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('~/pages/Index.vue'),
      beforeEnter: requireAuthentication,
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: () => import('~/pages/sign-in/Index.vue'),
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: () => import('~/pages/sign-up/Index.vue'),
    },
  ],
})
