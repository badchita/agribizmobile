<template>
    <ion-page>
        <ion-header>
            <Header title="Address Selection" />
        </ion-header>

        <ion-content>
            <ion-item lines="none">
                <ion-label class="detail-label">
                    <label class="name-label ion-margin-end">Name</label>
                    <ion-icon size="small" color="medium" name="checkmark" /> <br>
                    <label>Mobile</label> <br>
                    <label>street</label> <br>
                    <label>Barangay, City</label> <br>
                    <label>province</label>
                </ion-label>
            </ion-item>

            <ion-item class="ion-margin-top" style="font-size: 14px;" lines="none">
                <ion-label>Add a new address</ion-label>
                <ion-button fill="clear" @click="onClickNewAddress">
                    <ion-icon name="add" slot="icon-only" color="medium"></ion-icon>
                </ion-button>
            </ion-item>
        </ion-content>
    </ion-page>
</template>

<script>
    import {
        useRouter
    } from 'vue-router'
    export default {
        setup() {
            const router = useRouter()

            function onClickNewAddress() {
                router.push(`/new-address`)
            }
            return {
                onClickNewAddress
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/global-variables.scss';
    @import '@/assets/css/global.scss';
    @import '@/assets/css/address-selection.scss';
</style>