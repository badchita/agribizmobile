<template>
    <ion-grid v-for="item in deliveredOrders" :key="item" class="ion-margin-top">
        <ion-row>
            <ion-col>
                <ion-label>{{item.seller_details.username}}</ion-label>
            </ion-col>
            <ion-col size="2.5">
                <ion-label style="color: #6c757d;">Delivered</ion-label>
            </ion-col>
        </ion-row>
        <ion-row>
            <ion-col size="4">
                <img :src="getThumbnail(item.product_details.thumbnail_name)" />
            </ion-col>
            <ion-col size="8">
                <ion-label>{{item.product_details.name}}</ion-label><br><br><br><br>
                <ion-label style="float:right; font-size: 14px;">x{{item.quantity}}</ion-label><br>
                <ion-label style="float:right; font-size: 14px;" color="medium">
                    ₱{{numberWithCommaFormatt(item.product_total_price)}}</ion-label>
            </ion-col>
        </ion-row>
        <ion-row>
            <ion-col>
                <ion-label style="font-size: 12px;" color="medium">{{item.quantity}} item</ion-label>
            </ion-col>
            <ion-col size="4.2">
                <ion-label style="font-size: 14px;" color="medium">Order Total: </ion-label>
                <ion-label style="font-size: 14px; color: #58a89d;">₱{{numberWithCommaFormatt(item.order_total_price)}}
                </ion-label>
            </ion-col>
        </ion-row>
        <ion-row style="font-size: 12px; color: #58a89d;">
            <ion-col size="1">
                <ion-icon size="small" name="cube-outline" />
            </ion-col>
            <ion-col>
                <ion-label>Product Delivered</ion-label>
            </ion-col>
        </ion-row>
        <ion-row>
            <ion-col size="12">
                <ion-button expand="full" @click="onClickUpdateStatus(item)">
                    Recieved
                </ion-button>
            </ion-col>
        </ion-row>
    </ion-grid>
</template>

<script>
    import ResourceURL from '@/api/resourceURL'
    import OrderAPI from '@/api/orders'

    import {
        ref
    } from '@vue/reactivity'
    export default {
        props: {
            deliveredOrders: {
                type: Object,
                default: function () {}
            },
        },
        setup() {
            let thumbnailPath = ref('')

            function getThumbnail(fileName) {
                if (fileName) {
                    return thumbnailPath.value = ResourceURL.api + fileName
                } else {
                    return thumbnailPath.value = 'https://www.fcprop.net/images/noimage.png'
                }
            }

            function onClickUpdateStatus(item) {
                item.order_status = '4'
                OrderAPI.updateStatus(item).then(() => {
                })
            }
            return {
                getThumbnail,
                onClickUpdateStatus,
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/global-variables.scss';
    @import '@/assets/css/global.scss';
    @import '@/assets/css/my-purchase.scss';
</style>