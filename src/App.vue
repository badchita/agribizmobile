<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script>
  import {
    IonApp,
    IonRouterOutlet
  } from '@ionic/vue';

  import {
    addIcons
  } from 'ionicons';


  import {
    homeOutline,
    gridOutline,
    notificationsOutline,
    personOutline,
    homeSharp,
    gridSharp,
    notificationsSharp,
    personSharp,
    cartOutline,
    chatbubbleEllipsesOutline,
    chevronForward,
    chevronForwardCircleOutline,
  } from 'ionicons/icons';

  addIcons({
    'home-outline': homeOutline,
    'grid-outline': gridOutline,
    'notifications-outline': notificationsOutline,
    'person-outline': personOutline,
    'home-sharp': homeSharp,
    'grid-sharp': gridSharp,
    'notifications-sharp': notificationsSharp,
    'person-sharp': personSharp,
    'cart-outline': cartOutline,
    'chatbubble-ellipses-outline': chatbubbleEllipsesOutline,
    'chevron-forward': chevronForward,
    'chevron-forward-circle-outline': chevronForwardCircleOutline,
  });

  export default ({
    name: 'App',
    components: {
      IonApp,
      IonRouterOutlet
    }
  });
</script>

<style lang="scss">
  * {
    font-family: Helvetica, sans-serif;
  }
</style>