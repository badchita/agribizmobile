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
    chevronDownOutline,
    chevronUpOutline,
    locationOutline,
    storefrontOutline,
    cashOutline,
    heart,
    add,
    checkmark,
    alertCircle,
    readerOutline,
    cubeOutline,
    busOutline,
    cardOutline,
    starOutline,
    timerOutline,
    checkmarkCircleOutline,
    checkboxOutline,
    ellipsisHorizontal,
    ellipse,
    cart,
    chatbubblesOutline,
    chatbubbles,
    createOutline,
    sendSharp,
    closeCircleOutline,
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
    'chevron-down-outline': chevronDownOutline,
    'chevron-up-outline': chevronUpOutline,
    'location-outline': locationOutline,
    'storefront-outline': storefrontOutline,
    'cash-outline': cashOutline,
    'heart': heart,
    'add': add,
    'checkmark': checkmark,
    'alert-circle': alertCircle,
    'reader-outline': readerOutline,
    'cube-outline': cubeOutline,
    'bus-outline': busOutline,
    'card-outline': cardOutline,
    'star-outline': starOutline,
    'timer-outline': timerOutline,
    'checkmark-circle-outline': checkmarkCircleOutline,
    'checkbox-outline': checkboxOutline,
    'ellipsis-horizontal': ellipsisHorizontal,
    'ellipse': ellipse,
    'cart': cart,
    'chatbubbles-outline': chatbubblesOutline,
    'chatbubbles': chatbubbles,
    'create-outline': createOutline,
    'send-sharp': sendSharp,
    'close-circle-outline': closeCircleOutline,
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