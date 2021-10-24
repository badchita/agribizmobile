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

        <ion-tab-button tab="feed" href="/tabs/feed">
          <ion-icon v-if="active.feed" name="grid-sharp" />
          <ion-icon v-else name="grid-outline" />
          <ion-label>Feed</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="notifications" href="/tabs/notifications">
          <ion-icon v-if="active.notifications" name="notifications-sharp" />
          <ion-icon v-else name="notifications-outline" />
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
  import {
    reactive
  } from '@vue/reactivity'
  export default {
    name: 'Tabs',
    components: {},
    setup() {
      const active = reactive({
        home: false,
        feed: false,
        notifications: false,
        me: false,
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

      return {
        onTabsChangeActive,
        active
      }
    }
  }
</script>