<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-searchbar type="text" slot="start" />
        <ion-buttons slot="end">
          <ion-button>
            <ion-icon name="cart-outline" />
            <ion-badge>
              1
            </ion-badge>
          </ion-button>
          <ion-button>
            <ion-icon name="chatbubble-ellipses-outline" />
            <ion-badge>
              1
            </ion-badge>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col size="9">
            <ion-label style="color: #58a89d;">TOP PRODUCTS</ion-label>
          </ion-col>
          <ion-col  style="font-size: 14px;">
            <ion-label color="medium" >See More </ion-label>
            <ion-icon color="medium" name='chevron-forward' />
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-slides :options="slideOpts">
            <ion-slide v-for="(item, i) in 8" :key="i">
              <ion-card class="top-product-card">
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
    </ion-content>
  </ion-page>
</template>

<script>
  export default {
    name: 'Home',
    components: {},
    setup() {
      const slideOpts = {
        initialSlide: 1,
        slidesPerView: 3,
      };
      return {
        slideOpts
      }
    }
  }
</script>

<style lang="scss">
  @import '@/assets/css/global-variables.scss';
  @import '@/assets/css/global.scss';
  @import '@/assets/css/home.scss';
</style>