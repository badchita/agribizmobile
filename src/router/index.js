import {
  createRouter,
  createWebHistory
} from '@ionic/vue-router';
import Tabs from '@/views/Pages/Tabs'

const routes = [{
    path: '/',
    redirect: '/splash'
  },
  {
    path: '/splash',
    component: () => import('@/views/Pages/SplashScreen')
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
  },
  {
    path: '/sign-up',
    component: () => import('@/views/Pages/SignUp')
  },
  {
    path: '/product-detail/:id',
    component: () => import('@/views/Pages/ProductDetail')
  },
  {
    path: '/checkout/:quantity/:id',
    component: () => import('@/views/Pages/Checkout')
  },
  {
    path: '/address-selection/:user_id',
    component: () => import('@/views/Pages/AddressSelection')
  },
  {
    path: '/new-address',
    component: () => import('@/views/Pages/NewAddress')
  },
  {
    path: '/order-pending',
    component: () => import('@/views/Pages/OrderPending')
  },
  {
    path: '/my-purchases/:segment',
    component: () => import('@/views/Pages/MyPurchase')
  },
  {
    path: '/rate-product/:product_id/:order_id',
    component: () => import('@/views/Pages/RateProduct')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router