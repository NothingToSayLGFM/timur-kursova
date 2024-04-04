import { createMemoryHistory, createRouter } from 'vue-router'

import Home from '../views/home.vue'
import Login from '../views/login.vue'
import AddTask from '../views/addTask.vue'
import AddUser from '../views/addUser.vue'
import { useUserStore } from '../stores/auth'

const routes = [
  { path: '/', name: 'home', component: Home, meta: { requiresAuth: true } },
  { path: '/add-task', name: 'add_task', component: AddTask, meta: { requiresAuth: true } },
  { path: '/add-user', name: 'add_user', component: AddUser, meta: { requiresAuth: true } },
  { path: '/login', name: 'login', component: Login }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const store = useUserStore()
  const isAuthenticated = () => {
    return store.user
  }

  if (to.matched.some((route) => route.meta?.requiresAuth)) {
    if (isAuthenticated()) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
