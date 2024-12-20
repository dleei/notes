import { createRouter,createWebHistory } from 'vue-router';
import routes from './router'
/* import { useUserStore } from '@/stores'
import { storeToRefs } from 'pinia' */

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

/* 导航守卫 */
/* router.beforeEach((to, from, next) => {
  document.title = to.meta.title || ''
  const userStore = useUserStore()

  const { getToken } = storeToRefs(userStore)

  if (!getToken.value && to.path !== '/login') {
    next('/login')
  } else {
    next()
  }
}) */

export default router
