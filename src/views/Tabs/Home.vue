<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-searchbar v-model="searchProducts" type="text" slot="start" />
        <!-- <ion-buttons slot="end">
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
        </ion-buttons> -->
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
        <ion-refresher-content>
        </ion-refresher-content>
      </ion-refresher>

      <div v-if="searchProducts === ''">
        <!-- top products -->
        <!-- <ion-grid>
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
        </ion-grid> -->

        <!-- featured products -->
        <!-- <ion-grid>
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
        </ion-grid> -->

        <!-- daily discover -->
        <ion-grid>
          <ion-row>
            <ion-col size="9.5">
              <ion-label style="color: #58a89d;">DAILY DISCOVER</ion-label>
            </ion-col>
            <!-- <ion-col class="header-see-more-label">
              <ion-label color="medium">See More</ion-label>
              <ion-icon color="medium" name='chevron-forward' />
            </ion-col> -->
          </ion-row>
          <ion-row>
            <ion-col class="daily-discover-col">
              <ion-card v-for="item in product" :key="item" button @click="onClickProductCard(item.id)">
                <img v-if="item.thumbnail_name === null" :src="getThumbnail(item.thumbnail_name)" height="140"
                  width="200" style="object-fit: fill;" />
                <img v-else :src="getThumbnail(item.thumbnail_name)" height="140" width="200"
                  style="object-fit: contain;" />
                <ion-card-header>
                  <ion-card-title class="ion-text-nowrap">
                    <ion-label>{{item.name}}</ion-label>
                  </ion-card-title>
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
      </div>

      <div v-else>
        <ion-grid>
          <ion-row>
            <ion-col size="9.5">
              <ion-label style="color: #58a89d;">SEARCHED PRODUCTS</ion-label>
            </ion-col>
            <!-- <ion-col class="header-see-more-label">
              <ion-label color="medium">See More</ion-label>
              <ion-icon color="medium" name='chevron-forward' />
            </ion-col> -->
          </ion-row>
          <ion-row>
            <ion-col class="daily-discover-col">
              <ion-card v-for="item in searchedProduct" :key="item" button @click="onClickProductCard(item.id)">
                <img v-if="item.thumbnail_name === null" :src="getThumbnail(item.thumbnail_name)" height="140"
                  width="200" style="object-fit: fill;" />
                <img v-else :src="getThumbnail(item.thumbnail_name)" height="140" width="200"
                  style="object-fit: contain;" />
                <ion-card-header>
                  <ion-card-title class="ion-text-nowrap">
                    <ion-label>{{item.name}}</ion-label>
                  </ion-card-title>
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
      </div>

      <ion-infinite-scroll @ionInfinite="loadMoreProducts($event)" id="infinite-scroll">
        <ion-infinite-scroll-content loading-spinner="bubbles" loading-text="Loading more data...">
        </ion-infinite-scroll-content>
      </ion-infinite-scroll>
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
    onMounted,
    watch
  } from '@vue/runtime-core';
  import {
    useRouter
  } from 'vue-router';
  export default {
    name: 'Home',
    components: {},
    setup() {
      onMounted(() => {
        loadProduct(0)
      })
      const router = useRouter()

      let thumbnailPath = ref('')
      let product = ref({})
      let searchedProduct = ref({})
      let searchProducts = ref('')

      const slideOptsTopProd = {
        initialSlide: 1,
        slidesPerView: 3,
      };

      const slideOptsFeatProd = {
        initialSlide: 1,
        slidesPerView: 2,
      };

      watch(searchProducts, function (val) {
        loadSearchProducts(val)
      })

      function onClickProductCard(id) {
        router.push(`/product-detail/${id}`)
      }

      function doRefresh(event) {
        loadProduct(0, true)
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

      async function loadProduct(more, r) {
        const params = {
          offset: 0,
          limit: 10 + more,
          random: r
        }
        await ProductAPI.list(params).then((response) => {
          product.value = response.data
        }).catch((err) => {
          console.error(err);
        })
      }
      async function loadSearchProducts(name) {
        await ProductAPI.searchCustomerall(name).then((response) => {
          searchedProduct.value = response.data
        })
      }
      async function loadMoreProducts(ev) {
        setTimeout(() => {
          loadProduct(10).then(() => {
            ev.target.complete()
          })
        }, 500)
      }
      return {
        slideOptsTopProd,
        slideOptsFeatProd,
        product,
        onClickProductCard,
        doRefresh,
        getThumbnail,
        thumbnailPath,
        searchProducts,
        searchedProduct,
        loadMoreProducts
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/assets/css/global-variables.scss';
  @import '@/assets/css/global.scss';
  @import '@/assets/css/home.scss';
</style>