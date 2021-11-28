<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-buttons slot="end">
          <ion-button>
            <ion-icon class="cart-chat-icon" style="color: white;" name="cart-outline" />
            <ion-badge class="notification-badge" style="background: white; color: #58a89d;">
              1
            </ion-badge>
          </ion-button>
          <ion-button>
            <ion-icon class="cart-chat-icon" style="color: white;" name="chatbubble-ellipses-outline" />
            <ion-badge class="notification-badge" style="background: white; color: #58a89d;">
              1
            </ion-badge>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
      <ion-toolbar no-border-top>
        <ion-avatar slot="start">
          <ion-icon name="person-sharp" />
          <!-- <ion-img src="https://pickaface.net/gallery/avatar/unr_test_180821_0925_9k0pgs.png"/> -->
        </ion-avatar>
        <ion-row v-if="isUserLoggedIn" class="user-detail-row">
          <ion-col size="7">
            <ion-label class="user-name-label"><strong>{{userData.username}}</strong></ion-label>
          </ion-col>
          <ion-col size="7">
            <ion-chip>{{userData.user_type}}</ion-chip>
          </ion-col>
          <ion-col size="7">
            <ion-label>Following <strong>0</strong></ion-label>
          </ion-col>
        </ion-row>
        <ion-buttons v-if="!isUserLoggedIn" slot="end">
          <ion-button class="login-button" @click="onClickLogin">
            Log In
          </ion-button>
          <ion-button class="sign-up-button" @click="onClickSignUp">
            Sign Up
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
        <ion-refresher-content>
        </ion-refresher-content>
      </ion-refresher>
      <ion-list>
        <ion-item lines="none" button @click="onClickMyPurchase('delivered')">
          <ion-icon style="color: #483D8B;" name="reader-outline" slot="start" />
          <ion-label>My Purchase</ion-label>
          <label style="font-size: 12px;">Purchase History</label>
          <ion-icon color="medium" name="chevron-forward-outline" slot="end" />
        </ion-item>
        <ion-row class="ion-text-center">
          <ion-col size="3">
            <ion-button fill="clear" @click="onClickMyPurchase('pending')">
              <ion-icon color="medium" name="timer-outline" />
              <ion-badge v-if="pendingOrders.length > 0" class="notification-order-badge">
                {{pendingOrders.length}}
              </ion-badge>
            </ion-button>
            <br />
            Pending
          </ion-col>
          <ion-col size="3">
            <ion-button fill="clear" @click="onClickMyPurchase('accepted')">
              <ion-icon color="medium" name="checkmark-circle-outline" />
              <ion-badge v-if="acceptedOrders.length > 0" class="notification-order-badge">
                {{acceptedOrders.length}}
              </ion-badge>
            </ion-button>
            <br />
            Accepted
          </ion-col>
          <ion-col size="3">
            <ion-button fill="clear" @click="onClickMyPurchase('torecieve')">
              <ion-icon color="medium" name="bus-outline" />
              <ion-badge v-if="toRecieveOrders.length > 0" class="notification-order-badge">
                {{toRecieveOrders.length}}
              </ion-badge>
            </ion-button>
            <br />
            To Recieve
          </ion-col>
          <ion-col size="3">
            <ion-button fill="clear" @click="onClickMyPurchase('completed')">
              <ion-badge v-if="toRateOrders.length > 0" class="notification-order-badge">
                {{toRateOrders.length}}
              </ion-badge>
              <ion-icon color="medium" name="star-outline" />
            </ion-button>
            <br />
            To Rate
          </ion-col>
        </ion-row>
      </ion-list>

      <ion-list>
        <ion-item lines="none" button>
          <ion-icon style="color: #483D8B;" name="person-outline" slot="start" />
          <ion-label>My Account Settings</ion-label>
          <ion-icon color="medium" name="chevron-forward-outline" slot="end" />
        </ion-item>
        <ion-item lines="none" button>
          <ion-icon color="success" name="help-circle-outline" slot="start" />
          <ion-label>Help</ion-label>
          <ion-icon color="medium" name="chevron-forward-outline" slot="end" />
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
  import {
    computed,
    ref
  } from '@vue/reactivity'
  import {
    useRouter
  } from 'vue-router'
  import {
    useStore
  } from 'vuex'
  import {
    onMounted,
    watch
  } from '@vue/runtime-core'
  export default {
    name: 'Me',
    components: {},
    setup() {
      onMounted(() => {
        if (Object.keys(userData.value).length > 0) {
          getOrderStatus()
        }
      })

      const router = useRouter()
      const store = useStore()

      let pendingOrders = ref([])
      let acceptedOrders = ref([])
      let toRecieveOrders = ref([])
      let toRateOrders = ref([])

      const userData = computed(() => store.state.user.userData)
      const isUserLoggedIn = computed(() => store.state.auth.isUserLoggedIn)
      const userId = computed(() => store.state.auth.userId)

      watch(userId, function () {
        store.dispatch('user/loadUserData', userId.value).then(() => {
          getOrderStatus()
        })
      })

      function doRefresh(event) {
        store.dispatch('user/loadUserData', userId.value).then(() => {
          getOrderStatus()
        }).finally(() => {
          setTimeout(() => {
            if (event)
              event.target.complete()
          }, 500)
        })
      }

      function onClickLogin() {
        router.push(`/login`)
      }

      function onClickSignUp() {
        router.push(`/sign-up`)
      }

      function onClickMyPurchase(segment) {
        router.push(`/my-purchases/${segment}`)
      }

      function getOrderStatus(orders) {
        pendingOrders.value = []
        acceptedOrders.value = []
        toRecieveOrders.value = []
        toRateOrders.value = []
        orders = userData.value.orders
        console.log(orders);
        orders.forEach((value) => {
          switch (value.order_status) {
            case '0': {
              pendingOrders.value.push(value)
            }
            break
          case '1': {
            acceptedOrders.value.push(value)
          }
          break
          case '2': {
            toRecieveOrders.value.push(value)
          }
          break
          case '4': {
            if (value.rated === 0)
              toRateOrders.value.push(value)
          }
          break
          }
        })
      }
      return {
        onClickLogin,
        onClickSignUp,
        isUserLoggedIn,
        userData,
        onClickMyPurchase,
        pendingOrders,
        acceptedOrders,
        toRecieveOrders,
        toRateOrders,
        doRefresh
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/assets/css/global-variables.scss';
  @import '@/assets/css/global.scss';
  @import '@/assets/css/me.scss';
</style>