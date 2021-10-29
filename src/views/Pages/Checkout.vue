<template>
    <ion-page>
        <ion-header>
            <Header title="Checkout" />
        </ion-header>

        <ion-content>
            <!-- deliver address -->
            <ion-item-group class="ion-margin-top">
                <ion-item style="height: 28px" lines="none">
                    <ion-icon name="location-outline" />
                    <ion-label class="delivery-address-header-label">
                        Delivery Adddress
                    </ion-label>
                </ion-item>
                <ion-item class="delivery-item" lines="none">
                    <ion-label>Name | Mobile</ion-label>
                </ion-item>
                <ion-item class="delivery-item" lines="none">
                    <ion-label>Street</ion-label>
                </ion-item>
                <ion-item class="delivery-item" lines="none">
                    <ion-label>Barangay, City, Region</ion-label>
                </ion-item>
                <ion-item class="delivery-item" lines="none">
                    <ion-label>State</ion-label>
                </ion-item>
            </ion-item-group>

            <!-- product  details -->
            <ion-grid class="ion-margin-top product-detail-grid">
                <ion-row>
                    <ion-col>
                        <ion-icon name="storefront-outline" class="ion-margin-end" />
                        <ion-label><strong>{{seller.name}}</strong></ion-label>
                    </ion-col>
                </ion-row>
                <ion-row class="product-detail-row">
                    <ion-col size="3.5">
                        <img width="100" src="@/assets/images/demo-top-product.jpg" />
                    </ion-col>
                    <ion-col>
                        <ion-text>{{products_detail.name}}</ion-text> <br>
                        <ion-text class="product-detail-quantity-text">Stocks: {{products_detail.quantity}}</ion-text>
                        <br>
                        <ion-text class="product-detail-quantity-text">₱{{numberWithCommaFormatt(products_detail.price)}}</ion-text>
                    </ion-col>
                </ion-row>
            </ion-grid>

            <!-- shipping details -->
            <ion-grid class="ion-margin-top">
                <ion-row>
                    <ion-col>
                        <ion-icon name="airplane-outline" class="ion-margin-end" />
                        <ion-label><strong>Shipping</strong></ion-label>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col size="10">
                        <ion-label>Standard Local</ion-label>
                    </ion-col>
                    <ion-col size="2">
                        <ion-label>₱{{numberWithCommaFormatt(addresses_detail.shipping_fee)}}</ion-label>
                    </ion-col>
                    <ion-col>
                        <ion-label color="medium" style="font-size: 12px;">Recieve by 4 - 11 Nov</ion-label>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col>
                        <ion-label>Message: </ion-label>
                        <ion-textarea rows="1" class="ion-margin-end" style="margin-left: -8px;"
                            placeholder="Please leave a message" type="text" />
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col size="10">
                        <ion-label>Order total {{quantity}} Item(s):</ion-label>
                    </ion-col>
                    <ion-col>
                        <ion-label>₱{{numberWithCommaFormatt(totalPayment)}}</ion-label>
                    </ion-col>
                </ion-row>
            </ion-grid>

            <!-- patment -->
            <ion-grid class="ion-margin-top payment-grid">
                <ion-row>
                    <ion-col size="7.6">
                        <ion-icon name="cash-outline" class="ion-margin-end" />
                        <ion-label>Payment Option</ion-label>
                    </ion-col>
                    <ion-col>
                        <ion-label>Payment Option</ion-label>
                        <ion-icon color="medium" name="chevron-forward-outline" />
                    </ion-col>
                </ion-row>
                <ion-row class="payment-row">
                    <ion-col size="10">
                        <ion-label>Item Subtotal</ion-label>
                    </ion-col>
                    <ion-col size="2">
                        <ion-label>₱{{numberWithCommaFormatt(itemSubtotal)}}</ion-label>
                    </ion-col>
                    <ion-col size="10">
                        <ion-label>Shipping Subtotal</ion-label>
                    </ion-col>
                    <ion-col size="2">
                        <ion-label>₱{{numberWithCommaFormatt(addresses_detail.shipping_fee)}}</ion-label>
                    </ion-col>
                    <ion-col size="10">
                        <strong>Total Payment</strong>
                    </ion-col>
                    <ion-col size="2">
                        <strong style="color: #58a89d;">₱{{numberWithCommaFormatt(totalPayment)}}</strong>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>

        <ion-footer>
            <ion-toolbar>
                <ion-item lines="none">
                    <ion-label>Total Payment:</ion-label>
                    <ion-label><strong>₱{{numberWithCommaFormatt(totalPayment)}}</strong></ion-label>
                </ion-item>
                <ion-button slot="end">Place Order</ion-button>
            </ion-toolbar>
        </ion-footer>
    </ion-page>
</template>

<script>
    import ProductAPI from '@/api/product'
    import {
        computed,
        onMounted,
        ref
    } from '@vue/runtime-core'
    import {
        useRouter
    } from 'vue-router'
    export default {
        setup() {
            onMounted(() => {
                loadProductDetail()
            })

            const router = useRouter()

            let products_detail = ref({})
            let addresses_detail = ref({})
            let seller = ref({})

            let totalPayment = computed(() => {
                return itemSubtotal.value + addresses_detail.value.shipping_fee
            })
            let quantity = computed(() => {
                return router.currentRoute.value.params.quantity
            })
            let itemSubtotal = computed(() => {
                return products_detail.value.price * quantity.value
            })

            function loadProductDetail() {
                const id = router.currentRoute.value.params.id

                ProductAPI.get(id).then((response) => {
                    products_detail.value = response.data.data
                    seller.value = response.data.data.seller
                    addresses_detail.value = response.data.data.addresses_detail
                }).catch((err) => {
                    console.error(err);
                })
            }

            function numberWithCommaFormatt(number) {
                var n = parseFloat(number).toFixed(2)
                var withComma = Number(n).toLocaleString('en')
                return withComma
            }
            return {
                products_detail,
                seller,
                quantity,
                itemSubtotal,
                numberWithCommaFormatt,
                addresses_detail,
                totalPayment
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/global-variables.scss';
    @import '@/assets/css/global.scss';
    @import '@/assets/css/checkout.scss';
</style>