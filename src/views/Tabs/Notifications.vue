<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-title class="header-title">
          Notifications
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
        <ion-refresher-content>
        </ion-refresher-content>
      </ion-refresher>
      <ion-list class="ion-margin-top">
        <ion-list-header>
          <ion-label>
            Order Updates
          </ion-label>
        </ion-list-header>
        <ion-item v-for="(item,i) in notifications_vendor" :key="i" lines="full" button @click="onClickItem(item)">
          <ion-label v-if="item.markRead === 0" class="ion-text-wrap" style="font-size: 16px; font-weight: 700;">
            {{item.title}} <br>
            <p>{{item.subject}}</p>
            <p>{{formatDate(item.created_at)}}</p>
          </ion-label>
          <ion-label v-else class="ion-text-wrap" style="font-size: 16px;">
            {{item.title}} <br>
            <p>{{item.subject}}</p>
            <p>{{formatDate(item.created_at)}}</p>
          </ion-label>
          <ion-icon v-if="item.markRead === 0" slot="end" color="primary" name="ellipse" style="font-size: 16px;" />
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
  import NotificationVendorAPI from '@/api/notifications_vendor'

  import {
    computed,
    onMounted,
    ref
  } from '@vue/runtime-core'
  import {
    useStore
  } from 'vuex'
  import {
    useRouter
  } from 'vue-router'
  export default {
    name: 'NotificationTab',
    components: {},
    setup() {
      onMounted(() => {
        loadNotificationVendor()
      })

      const router = useRouter()
      const store = useStore()

      const userData = computed(() => store.state.user.userData)

      let notifications_vendor = ref([])

      function doRefresh(event) {
        if (userData.value.id) {
          loadNotificationVendor().finally(() => {
            setTimeout(() => {
              if (event)
                event.target.complete()
            }, 500)
          })
        } else {
          setTimeout(() => {
            if (event)
              event.target.complete()
          }, 500)
        }
      }

      function onClickItem(item) {
        let params = {
          id: item.id,
          markRead: 1,
        }
        if (item.order_id) {
          if (item.markRead === 0) {
            NotificationVendorAPI.markAsRead(params).then(() => {
              if (item.orders.order_status === '1')
                router.push(`/my-purchases/accepted`)
              if (item.orders.order_status === '2')
                router.push(`/my-purchases/torecieve`)
              if (item.orders.order_status === '3')
                router.push(`/my-purchases/delivered`)
            })
          } else {
            if (item.orders.order_status === '1')
              router.push(`/my-purchases/accepted`)
            if (item.orders.order_status === '2')
              router.push(`/my-purchases/torecieve`)
            if (item.orders.order_status === '3')
              router.push(`/my-purchases/delivered`)
          }
        }
      }

      async function loadNotificationVendor() {
        const params = {
          offset: 0,
          limit: 10,
          to_id: userData.value.id
        }
        await NotificationVendorAPI.list(params).then((response) => {
          notifications_vendor.value = response.data.data
        }).catch((err) => {
          console.error(err);
        })
      }

      return {
        notifications_vendor,
        doRefresh,
        onClickItem
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/assets/css/global-variables.scss';
  @import '@/assets/css/global.scss';
</style>