<template>
  <ion-page>
    <ion-header collapse="condense">
      <ion-toolbar>
        <ion-item lines="none">
          <ion-searchbar />
          <ion-icon name="cart-outline" />
          <ion-icon name="chatbubble-ellipses-outline" />
        </ion-item>
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
  @import '@/assets/css/home.scss';
  @import '@/assets/css/global-variables.scss';
</style>