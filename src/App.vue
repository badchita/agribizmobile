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
  } from 'ionicons/icons';

  addIcons({
    'home-outline': homeOutline,
    'grid-outline': gridOutline,
    'notifications-outline': notificationsOutline,
    'person-outline': personOutline,
  });

  export default ({
    name: 'App',
    components: {
      IonApp,
      IonRouterOutlet
    }
  });
</script>