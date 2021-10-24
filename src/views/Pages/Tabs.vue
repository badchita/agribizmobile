<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" href="/tabs/home">
          <ion-icon name="home-outline" />
          <ion-label>Home</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="feed" href="/tabs/feed">
          <ion-icon name="grid-outline"/>
          <ion-label>Feed</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="notifications" href="/tabs/notifications">
          <ion-icon name="notifications-outline"/>
          <ion-label>Notifications</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="me" href="/tabs/me">
          <ion-icon name="person-outline"/>
          <ion-label>Me</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script>
  export default {
    name: 'Tabs',
    components: {},
    setup() {
      return {}
    }
  }
</script>