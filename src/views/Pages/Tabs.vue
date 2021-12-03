<template>
  <ion-page>
    <ion-tabs @ionTabsDidChange="onTabsChangeActive($event)">
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" href="/tabs/home">
          <ion-icon v-if="active.home" name="home-sharp" />
          <ion-icon v-else name="home-outline" />
          <ion-label>Home</ion-label>
        </ion-tab-button>

        <!-- <ion-tab-button tab="feed" href="/tabs/feed">
          <ion-icon v-if="active.feed" name="grid-sharp" />
          <ion-icon v-else name="grid-outline" />
          <ion-label>Feed</ion-label>
        </ion-tab-button> -->

        <ion-tab-button tab="notifications" href="/tabs/notifications">
          <ion-icon v-if="active.notifications" name="notifications-sharp" />
          <ion-icon v-else name="notifications-outline" />
          <ion-badge v-if="newNotification.length > 0" class="notification-badge-tabs">
            {{newNotification.length}}
          </ion-badge>
          <ion-label>Notifications</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="me" href="/tabs/me">
          <ion-icon v-if="active.me" name="person-sharp" />
          <ion-icon v-else name="person-outline" />
          <ion-label>Me</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script>
  import NotificationVendorAPI from '@/api/notifications_vendor'

  import {
    computed,
    reactive,
    ref
  } from '@vue/reactivity'
  import {
    onMounted,
    watch
  } from '@vue/runtime-core'
  import {
    useStore
  } from 'vuex'
  export default {
    name: 'Tabs',
    components: {},
    setup() {
      onMounted(() => {
        if (userId.value)
          loadNotificationVendor()
      })
      const store = useStore()

      const active = reactive({
        home: false,
        feed: false,
        notifications: false,
        me: false,
      })

      let newNotification = ref([])

      // const userData = computed(() => store.state.user.userData)
      const userId = computed(() => store.state.auth.userId)

      watch(newNotification, function (val) {
        newNotification = val
      })

      function onTabsChangeActive(ev) {
        switch (ev.tab) {
          case 'home': {
            active.home = true
            active.feed = false
            active.notifications = false
            active.me = false
          }
          break
        case 'feed': {
          active.home = false
          active.feed = true
          active.notifications = false
          active.me = false
        }
        break
        case 'notifications': {
          active.home = false
          active.feed = false
          active.notifications = true
          active.me = false
        }
        break
        case 'me': {
          active.home = false
          active.feed = false
          active.notifications = false
          active.me = true
        }
        break

        default:
          Object.keys(active).forEach(function (key) {
            active[key] = false
          })
        }
      }

      function loadNotificationVendor() {
        const params = {
          offset: 0,
          limit: 10,
          to_id: userId.value
        }
        NotificationVendorAPI.list(params).then((response) => {
          // notifications_vendor.value = response.data.data
          response.data.data.forEach((value) => {
            switch (value.new) {
              case 1: {
                newNotification.value.push(value)
              }
              break
            }
          })
        })
      }

      return {
        onTabsChangeActive,
        active,
        newNotification
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/assets/css/global-variables.scss';
  @import '@/assets/css/global.scss';
  @import '@/assets/css/tabs.scss';
</style>