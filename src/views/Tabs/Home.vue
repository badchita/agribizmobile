<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-searchbar type="text" slot="start"/>
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
    </ion-content>
  </ion-page>
</template>

<script>
  export default {
    name: 'Home',
    components: {}
  }
</script>

<style lang="scss">
  @import '@/assets/css/global-variables.scss';
  @import '@/assets/css/home.scss';
</style>