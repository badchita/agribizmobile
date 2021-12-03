<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-title class="header-title">
          Cart
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
        <ion-refresher-content>
        </ion-refresher-content>
      </ion-refresher>

      <ion-item-sliding v-for="(item,i) in cart" :key="i" class="ion-margin-top">
        <ion-item lines="none" @click="clickItem(item)">
          <img style="margin-right: 8px;" width="100" :src="getThumbnail(item.product_details.thumbnail_name)" />
          <ion-label>{{item.product_details.name}} <br>
            <h5 class="product-stock-style">Stocks: {{item.product_details.quantity}}</h5>
            <h5 class="product-stock-style">Stocks: ₱{{numberWithCommaFormatt(item.product_details.price)}}</h5>
          </ion-label>
        </ion-item>
        <ion-item-options side="end">
          <ion-item-option color="danger" @click="onClickDelete(item)">Delete</ion-item-option>
        </ion-item-options>
      </ion-item-sliding>
    </ion-content>
  </ion-page>
</template>

<script>
  import CartAPI from '@/api/carts'
  import ResourceURL from '@/api/resourceURL'

  import CartCheckout from '@/popovers/CartCheckout.vue'

  import {
    computed,
    onMounted,
    ref
  } from '@vue/runtime-core'
  import {
    useStore
  } from 'vuex'
  import {
    popoverController
  } from '@ionic/core'
  export default {
    name: 'Feed',
    components: {},
    setup() {
      onMounted(() => {
        loadCart
      })
      const store = useStore()

      let cart = ref([])
      let thumbnailPath = ref('')
      let quantity = ref(0)

      const userData = computed(() => store.state.user.userData)

      function doRefresh(event) {
        if (userData.value.id) {
          loadCart().finally(() => {
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

      function getThumbnail(fileName) {
        if (fileName) {
          return thumbnailPath.value = ResourceURL.api + fileName
        } else {
          return thumbnailPath.value = 'https://www.fcprop.net/images/noimage.png'
        }
      }

      async function clickItem(item) {
        let popover = await popoverController.create({
          component: CartCheckout,
          componentProps: {
            cart: item
          },
          showBackdrop: true,
        })

        await popover.present();
      }
      async function loadCart() {
        let params = {
          user_id: userData.value.id
        }
        await CartAPI.list(params).then((response) => {
          cart.value = response.data.data
        })
      }
      async function onClickDelete(item) {
        await CartAPI.delete(item.id).then(() => {
          loadCart()
        })
      }
      return {
        cart,
        doRefresh,
        getThumbnail,
        quantity,
        clickItem,
        onClickDelete
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/assets/css/global-variables.scss';
  @import '@/assets/css/global.scss';
  @import '@/assets/css/cart.scss';
</style>