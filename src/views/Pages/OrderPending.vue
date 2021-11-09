<template>
    <ion-page>
        <ion-header>
            <Header title="Order Pending" />
        </ion-header>

        <ion-content>
            <ion-card>
                <ion-card-header>
                    <ion-card-title>
                        <ion-item class="card-title-item" lines="none">
                            <ion-icon name="alert-circle" />
                                <h3>Pending</h3>
                        </ion-item>
                    </ion-card-title>
                    <ion-card-subtitle>
                        <ion-label>
                            Your Order Is Pending. Please Wait For Seller's Accpetance. Go To My Purchase For More Info
                        </ion-label>
                    </ion-card-subtitle>
                    <ion-card-content>
                        <ion-item lines="none">
                            <ion-button expand="block" fill="clear" @click="onClickHome">Home</ion-button>
                            <ion-button expand="block" fill="clear">My Purchase</ion-button>
                        </ion-item>
                    </ion-card-content>
                </ion-card-header>
            </ion-card>
        </ion-content>
    </ion-page>
</template>

<script>
import { useRouter } from 'vue-router'
    export default {
        setup() {
            const router = useRouter()
            function onClickHome() {
                router.push('/tabs/')
            }
            return {onClickHome}
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/global-variables.scss';
    @import '@/assets/css/global.scss';
    @import '@/assets/css/order-pending.scss';
</style>