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
        path: 'cart',
        component: () => import('@/views/Tabs/Cart')
      },
      {
        path: 'chat',
        component: () => import('@/views/Tabs/Chat')
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
  },
  {
    path: '/product-ratings/:product_id',
    component: () => import('@/views/Pages/ProductRatings')
  },
  {
    path: '/account-settings',
    component: () => import('@/views/Pages/AccountSetting')
  },
  {
    path: '/conversation/:id',
    component: () => import('@/views/Pages/Conversation')
  },
  {
    path: '/update-profile',
    component: () => import('@/views/Pages/UpdateProfile')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router