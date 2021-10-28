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
    chevronForwardOutline,
    helpCircleOutline,
    lockClosedOutline,
    eyeOff,
    eye,
    logoGoogle,
    logoFacebook,
    mailOutline,
    phonePortraitOutline,
    calendarOutline,
    heartOutline,
    bus,
    airplane,
    airplaneOutline,
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
    'chevron-forward-outline': chevronForwardOutline,
    'help-circle-outline': helpCircleOutline,
    'lock-closed-outline': lockClosedOutline,
    'eye-off': eyeOff,
    'eye': eye,
    'logo-google': logoGoogle,
    'logo-facebook': logoFacebook,
    'mail-outline': mailOutline,
    'phone-portrait-outline': phonePortraitOutline,
    'calendar-outline': calendarOutline,
    'heart-outline': heartOutline,
    'bus': bus,
    'airplane': airplane,
    'airplane-outline': airplaneOutline,
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