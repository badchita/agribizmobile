<template>
    <ion-page>
        <ion-header>
            <Header title="Login" />
        </ion-header>

        <ion-content>
            <div class="logo-container">
                <img src="@/assets/images/logo.png" />
            </div>

            <ion-list>
                <ion-item>
                    <ion-icon name="person-outline" slot="start" />
                    <ion-input placeholder="Email" />
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-page>
</template>

<script>
    export default {
        setup() {


            return {}
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/global-variables.scss';
    @import '@/assets/css/login.scss';
</style>