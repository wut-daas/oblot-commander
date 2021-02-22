import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router'
import { AppRouteRecord } from './approuterecord'
import Home from '../views/Home.vue'
import Connect from '../views/Connect.vue'
import About from '../views/About.vue'
import Parameters from '../views/Parameters.vue'
import Plot from '../views/Plot.vue'

export const routes: Array<AppRouteRecord> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/connect',
    name: 'Connect',
    component: Connect,
    shortcut: 'C',
  },
  {
    path: '/parameters',
    name: 'Param',
    component: Parameters,
    shortcut: 'P',
  },
  {
    path: '/plot',
    name: 'Plot',
    component: Plot,
    shortcut: 'T',
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    flexGrow: true,
  },
]

const router = createRouter({
  history: process.env.IS_ELECTRON
    ? createWebHashHistory()
    : createWebHistory(),
  routes,
})

export default router
