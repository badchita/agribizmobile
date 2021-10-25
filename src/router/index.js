import {
  createRouter,
  createWebHistory
} from '@ionic/vue-router';
import Tabs from '@/views/Pages/Tabs'

const routes = [{
    path: '/',
    redirect: '/tabs/home'
  },
  {
    path: '/tabs/',
    component: Tabs,
    children: [{
        path: '',
        redirect: '/tabs/home'
      },
      {
        path: 'home',
        component: () => import('@/views/Tabs/Home')
      },
      {
        path: 'feed',
        component: () => import('@/views/Tabs/Feed')
      },
      {
        path: 'notifications',
        component: () => import('@/views/Tabs/Notifications')
      },
      {
        path: 'me',
        component: () => import('@/views/Tabs/Me')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/Pages/Login')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router