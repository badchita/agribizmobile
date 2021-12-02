<template>
    <ion-page>
        <ion-header class="ion-no-border">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button style="color: #58a89d;" @click="onClickGoBack"></ion-back-button>
                </ion-buttons>
                <ion-title class="ion-margin-end header-title">
                    Account Settings
                </ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <ion-list class="ion-margin-top">
                <ion-list-header>
                    <ion-label>
                        My Account
                    </ion-label>
                </ion-list-header>

                <ion-item lines="full">
                    <ion-label>
                        <h2>My Profile</h2>
                    </ion-label>
                    <ion-icon color="medium" size="small" name="chevron-forward-outline" slot="end" />
                </ion-item>
                <ion-item lines="full">
                    <ion-label>
                        <h2>My Addresses</h2>
                    </ion-label>
                    <ion-icon color="medium" size="small" name="chevron-forward-outline" slot="end" />
                </ion-item>
                <ion-item lines="full">
                    <ion-label>
                        <h2>Request Verification</h2>
                    </ion-label>
                    <ion-icon color="medium" size="small" name="chevron-forward-outline" slot="end" />
                </ion-item>
            </ion-list>
            <ion-loading :is-open="openLoading" message="Logging Out..."></ion-loading>
        </ion-content>

        <ion-footer class="ion-no-border">
            <ion-toolbar class="footer-toolbar">
                <ion-button class="ion-text-capitalize" style="--background: #58a89d; --box-shadow: none" expand="full"
                    @click="onClickSignOut">
                    Logout</ion-button>
            </ion-toolbar>
        </ion-footer>
    </ion-page>
</template>

<script>
    import AuthAPI from '@/api/auth'

    import {
        useRouter
    } from 'vue-router'
    import {
        useStore
    } from 'vuex'
    import {
        computed,
        ref
    } from '@vue/reactivity'
    export default {
        setup() {
            const router = useRouter()
            const store = useStore()

            let loginResponse = computed(() => store.state.auth.response)
            let openLoading = ref(false)

            function onClickGoBack() {
                router.go(`/tabs/me`)
            }
            async function onClickSignOut() {
                openLoading.value = true
                console.log(loginResponse.value);
                AuthAPI.logout(loginResponse.value).then((response) => {
                    store.dispatch('user/removeUserData')
                    store.dispatch('auth/logout')
                    setTimeout(() => {
                        store.dispatch('toast/presentToast', {
                            m: response.data.message,
                            type: ''
                        })
                    }, 1000)
                    router.push(`/tabs/me`)
                    // setTimeout(() => {
                    //     router.go()
                    // }, 500)
                }).finally(() => {
                    openLoading.value = false
                })
            }

            return {
                onClickGoBack,
                onClickSignOut,
                openLoading
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/global-variables.scss';
    @import '@/assets/css/global.scss';

    .footer-toolbar {
        --background: #F5F5F5 !important;
    }
</style>