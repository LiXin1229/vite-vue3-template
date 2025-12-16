import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'

import Layout from '@/views/Layout.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'layout',
    component: Layout
  },
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
