<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-buttons slot="end">
          <ion-button>
            <ion-icon class="cart-chat-icon" style="color: white;" name="cart-outline" />
            <ion-badge class="notification-badge" style="background: white; color: #58a89d;">
              1
            </ion-badge>
          </ion-button>
          <ion-button>
            <ion-icon class="cart-chat-icon" style="color: white;" name="chatbubble-ellipses-outline" />
            <ion-badge class="notification-badge" style="background: white; color: #58a89d;">
              1
            </ion-badge>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
      <ion-toolbar no-border-top>
        <ion-avatar slot="start">
          <ion-icon name="person-sharp" />
          <!-- <ion-img src="https://pickaface.net/gallery/avatar/unr_test_180821_0925_9k0pgs.png"/> -->
        </ion-avatar>
        <ion-buttons slot="end">
          <ion-button class="login-button" @click="onClickLogin">
            Log In
          </ion-button>
          <ion-button class="sign-up-button">
            Sign Up
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <ion-item lines="none" button>
          <ion-icon style="color: #483D8B;" name="person-outline" slot="start" />
          <ion-label>My Account Settings</ion-label>
          <ion-icon color="medium" name="chevron-forward-outline" slot="end" />
        </ion-item>
        <ion-item lines="none" button>
          <ion-icon color="success" name="help-circle-outline" slot="start" />
          <ion-label>Help</ion-label>
          <ion-icon color="medium" name="chevron-forward-outline" slot="end" />
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import { useRouter } from 'vue-router'
  export default {
    name: 'Me',
    components: {},
    setup () {
      const router = useRouter()

      function onClickLogin() {
        router.push(`/login`)
      }
      return {onClickLogin}
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/assets/css/global-variables.scss';
  @import '@/assets/css/global.scss';
  @import '@/assets/css/me.scss';
</style>