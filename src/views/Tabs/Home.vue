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
        <ion-row v-for="(item,i) in 5" :key="i">
          <ion-col>
            <ion-card class="slide-product-card" button>
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
          </ion-col>
          <ion-col>
            <ion-card class="slide-product-card" button>
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
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script>
  export default {
    name: 'Home',
    components: {},
    setup() {
      const slideOptsTopProd = {
        initialSlide: 1,
        slidesPerView: 3,
      };

      const slideOptsFeatProd = {
        initialSlide: 1,
        slidesPerView: 2,
      };
      return {
        slideOptsTopProd,
        slideOptsFeatProd
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/assets/css/global-variables.scss';
  @import '@/assets/css/global.scss';
  @import '@/assets/css/home.scss';
</style>