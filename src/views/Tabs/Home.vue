<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-searchbar type="text" slot="start" />
        <ion-buttons slot="end">
          <ion-button>
            <ion-icon class="cart-chat-icon" name="cart-outline" />
            <ion-badge class="notification-badge">
              1
            </ion-badge>
          </ion-button>
          <ion-button>
            <ion-icon class="cart-chat-icon" name="chatbubble-ellipses-outline" />
            <ion-badge class="notification-badge">
              1
            </ion-badge>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
        <ion-refresher-content>
        </ion-refresher-content>
      </ion-refresher>

      <!-- top products -->
      <ion-grid>
        <ion-row>
          <ion-col size="9.5">
            <ion-label style="color: #58a89d;">TOP PRODUCTS</ion-label>
          </ion-col>
          <ion-col class="header-see-more-label">
            <ion-label color="medium">See More </ion-label>
            <ion-icon color="medium" name='chevron-forward' />
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-slides :options="slideOptsTopProd">
            <ion-slide v-for="(item, i) in 8" :key="i">
              <ion-card class="slide-product-card">
                <img src="@/assets/images/demo-top-product.jpg" />
                <ion-card-header>
                  <ion-card-title>Apples</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                  81k+ sold
                </ion-card-content>
              </ion-card>
            </ion-slide>
            <ion-slide class="see-more-slide">
              <ion-list>
                <ion-item lines="none">
                  <ion-label class="see-more-label">See More</ion-label>
                </ion-item>
                <ion-icon name="chevron-forward-circle-outline" />
              </ion-list>
            </ion-slide>
          </ion-slides>
        </ion-row>
      </ion-grid>

      <!-- featured products -->
      <ion-grid>
        <ion-row>
          <ion-col size="9.5">
            <ion-label style="color: #58a89d;">FEATURED PRODUCTS</ion-label>
          </ion-col>
          <ion-col class="header-see-more-label">
            <ion-label color="medium">See More</ion-label>
            <ion-icon color="medium" name='chevron-forward' />
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-slides :options="slideOptsFeatProd">
            <ion-slide v-for="(item, i) in 8" :key="i">
              <ion-card class="slide-product-card">
                <img src="@/assets/images/demo-top-product.jpg" />
                <ion-card-header>
                  <ion-card-title>Apples</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                  <ion-label>
                    <p class="price">₱2000</p>
                    <p>31 sold</p>
                  </ion-label>
                </ion-card-content>
              </ion-card>
            </ion-slide>
            <ion-slide class="see-more-slide">
              <ion-list>
                <ion-item lines="none">
                  <ion-label class="see-more-label">See More</ion-label>
                </ion-item>
                <ion-icon name="chevron-forward-circle-outline" />
              </ion-list>
            </ion-slide>
          </ion-slides>
        </ion-row>
      </ion-grid>

      <!-- daily discover -->
      <ion-grid>
        <ion-row>
          <ion-col size="9.5">
            <ion-label style="color: #58a89d;">DAILY DISCOVER</ion-label>
          </ion-col>
          <ion-col class="header-see-more-label">
            <ion-label color="medium">See More</ion-label>
            <ion-icon color="medium" name='chevron-forward' />
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col class="daily-discover-col">
            <ion-card v-for="item in product" :key="item" :class="product.length % 2 === 0 ? 'even-card' : ''" button
              @click="onClickProductCard(item.id)">
              <img :src="getThumbnail(item.thumbnail_name)" height="140" style="object-fit: contain;" />
              <ion-card-header>
                <ion-card-title>{{item.name}}</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <ion-label>
                  <p class="price">₱{{numberWithCommaFormatt(item.price)}}</p>
                  <p>31 sold</p>
                </ion-label>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script>
  import ProductAPI from '@/api/product'
  import ResourceURL from '@/api/resourceURL'

  import {
    ref
  } from '@vue/reactivity';
  import {
    onMounted
  } from '@vue/runtime-core';
  import {
    useRouter
  } from 'vue-router';
  export default {
    name: 'Home',
    components: {},
    setup() {
      onMounted(() => {
        loadProduct()
      })
      const router = useRouter()

      let thumbnailPath = ref('')
      let product = ref({})

      const slideOptsTopProd = {
        initialSlide: 1,
        slidesPerView: 3,
      };

      const slideOptsFeatProd = {
        initialSlide: 1,
        slidesPerView: 2,
      };

      function onClickProductCard(id) {
        router.push(`/product-detail/${id}`)
      }

      function doRefresh(event) {
        loadProduct()
          .finally(() => {
            setTimeout(() => {
              if (event)
                event.target.complete()
            }, 500)
          })
      }

      function getThumbnail(fileName) {
        if (fileName) {
          return thumbnailPath.value = ResourceURL.api + fileName
        } else {
          return thumbnailPath.value = 'https://www.fcprop.net/images/noimage.png'
        }
      }

      async function loadProduct() {
        await ProductAPI.list().then((response) => {
          product.value = response.data
        }).catch((err) => {
          console.error(err);
        })
      }
      return {
        slideOptsTopProd,
        slideOptsFeatProd,
        product,
        onClickProductCard,
        doRefresh,
        getThumbnail,
        thumbnailPath
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/assets/css/global-variables.scss';
  @import '@/assets/css/global.scss';
  @import '@/assets/css/home.scss';
</style>