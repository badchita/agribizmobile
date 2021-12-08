<template>
    <ion-page>
        <ion-header class="ion-no-border">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button style="color: #58a89d;" @click="onClickGoBack"></ion-back-button>
                </ion-buttons>
                <ion-title class="ion-margin-end header-title">
                    Update Profile
                </ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <ion-list>
                <ion-item>
                    <div class="ion-margin-end">
                        <ion-icon color="medium" name="person-outline" />
                    </div>
                    <ion-input v-model="userData.name" placeholder="Name" />
                </ion-item>
                <ion-item>
                    <div class="ion-margin-end">
                        <ion-icon color="medium" name="person-outline" />
                    </div>
                    <ion-input v-model="userData.username" placeholder="Username" />
                </ion-item>
                <ion-item>
                    <div class="ion-margin-end">
                        <ion-icon color="medium" name="mail-outline" />
                    </div>
                    <ion-input v-model="userData.email" type="email" placeholder="Email" />
                </ion-item>
                <ion-item>
                    <div class="ion-margin-end">
                        <ion-icon color="medium" name="phone-portrait-outline" />
                    </div>
                    <ion-input v-model="userData.mobile" placeholder="Mobile" />
                </ion-item>
                <ion-item>
                    <div class="ion-margin-end">
                        <ion-icon color="medium" name="calendar-outline" />
                    </div>
                    <ion-datetime display-format="MM/DD/YYYY" placeholder="Birth Date" v-model="userData.birthday"
                        @ionChange="onChangeGetBithday($event)" />
                </ion-item>
                <ion-item>
                    <div class="ion-margin-end">
                        <ion-icon color="medium" name="calendar-outline" />
                    </div>
                    <ion-datetime display-format="MM/DD/YYYY" placeholder="Date Joined" v-model="userData.created_at"
                        disabled />
                </ion-item>
            </ion-list>
            <ion-loading :is-open="isLoading" message="Saving Changes..."></ion-loading>
        </ion-content>

        <ion-footer class="ion-no-border">
            <ion-toolbar class="footer-toolbar">
                <ion-button class="ion-text-capitalize" style="--background: #58a89d; --box-shadow: none" expand="full"
                    @click="onClickSave">
                    Save</ion-button>
            </ion-toolbar>
        </ion-footer>
    </ion-page>
</template>

<script>
    import {
        computed
    } from '@vue/reactivity'
    import {
        useRouter
    } from 'vue-router'
    import {
        useStore
    } from 'vuex'
    export default {
        setup() {
            const router = useRouter()
            const store = useStore()

            const userData = computed(() => store.state.user.userData)

            let isLoading = computed(() => store.state.loading.status);

            function onClickGoBack() {
                router.push(`/account-settings`)
            }
            
            async function onClickSave() {
                store.dispatch('loading/start')
                store.dispatch('user/updateUserData', userData.value).then(() => {
                        setTimeout(() => {
                            store.dispatch('toast/presentToast', {
                                m: 'Changes Saved',
                                type: ''
                            })
                        }, 2000)
                        router.push(`/tabs/me`)
                    })
                    .finally(() => {
                        store.dispatch('loading/finish')
                    })
            }
            return {
                onClickGoBack,
                userData,
                onClickSave,
                isLoading
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/global-variables.scss';
    @import '@/assets/css/global.scss';
    @import '@/assets/css/update-profile.scss';
</style>