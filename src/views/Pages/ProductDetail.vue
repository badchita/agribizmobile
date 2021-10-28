<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button style="color: #58a89d;" @click="onClickGoBack"></ion-back-button>
                </ion-buttons>
                <ion-searchbar type="text" />
                <ion-buttons slot="end">
                    <ion-button style="color: #58a89d;">
                        <ion-icon class="cart-chat-icon" name="cart-outline" />
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <ion-slides pager>
                <ion-slide v-for="(item, i) in 3" :key="i">
                    <img style="width: 100%;" src="@/assets/images/demo-top-product.jpg" />
                </ion-slide>
            </ion-slides>
            <ion-item-group>
                <ion-item lines="none">
                    <ion-badge>{{products.product_status}}</ion-badge>
                    <ion-label class="ion-margin-start" style="font-size: 18px;">
                        {{products.name}}
                    </ion-label>
                </ion-item>
                <ion-item lines="none">
                    <ion-label style="color: #58a89d;">
                        ₱{{products.price}}
                    </ion-label>
                </ion-item>
                <ion-item lines="none">
                    <StarRating :rating="4.6" :show-rating="true" :read-only="true" :increment="0.01" :star-size="18" />
                    <ion-icon slot="end" name="heart-outline" />
                </ion-item>
                <ion-item class="ion-margin-top" lines="none">
                    <ion-row class="shipping-row">
                        <ion-col size="10">
                            <ion-label>
                                <ion-icon class="ion-margin-end" color="success" name="bus" /> Free Shipping
                            </ion-label>
                        </ion-col>
                        <ion-col size="10">
                            <ion-label class="ion-text-wrap">
                                <ion-icon class="ion-margin-end" name="airplane-outline" /> Shipping from {{products.product_location}}
                            </ion-label>
                        </ion-col>
                        <ion-col size="10">
                            <ion-label>
                                Cost: 0
                            </ion-label>
                        </ion-col>
                    </ion-row>
                    <ion-icon slot="end" color="medium" name="chevron-forward" />
                </ion-item>
                <ion-item class="ion-margin-top" lines="none">
                    <ion-label style="font-size: 14px;">Quantity</ion-label>
                    <ion-input type="number" />
                </ion-item>
            </ion-item-group>

            <ion-grid class="ion-margin-top shop-detail-grid">
                <ion-row>
                    <ion-col size="2">
                        <ion-avatar>
                            <ion-icon name="person-sharp" />
                        </ion-avatar>
                    </ion-col>
                    <ion-col size="6">
                        <div class="ion-margin-top">
                            <ion-label>name</ion-label>
                        </div>
                    </ion-col>
                    <ion-col size="3.5">
                        <ion-button fill="clear" expand="full">View Shop</ion-button>
                    </ion-col>
                </ion-row>
                <ion-row class="shop-stats-row">
                    <ion-col>
                        <ion-label style="color: #58a89d; font-size: 20px">
                            0
                        </ion-label>
                        <br>
                        <ion-label color="medium" style="font-size: 14px">
                            Products
                        </ion-label>
                    </ion-col>
                    <ion-col>
                        <ion-label style="color: #58a89d; font-size: 20px">
                            0
                        </ion-label>
                        <br>
                        <ion-label color="medium" style="font-size: 14px">
                            Rating
                        </ion-label>
                    </ion-col>
                    <ion-col>
                        <ion-label style="color: #58a89d; font-size: 20px">
                            0
                        </ion-label>
                        <br>
                        <ion-label color="medium" style="font-size: 14px">
                            Chat Response
                        </ion-label>
                    </ion-col>
                </ion-row>
            </ion-grid>

            <ion-list class="ion-margin-top">
                <ion-list-header>
                    <strong>Products Details</strong>
                </ion-list-header>
                <ion-item lines="none">
                    <ion-label color="medium">Stock</ion-label>
                    <ion-label class="ion-margin-end">
                        <ion-badge>{{products.product_status}}</ion-badge>
                    </ion-label>
                </ion-item>
                <ion-item lines="none">
                    <ion-label color="medium">Ships From</ion-label>
                    <ion-label class="ion-margin-end ion-text-wrap">{{products.product_location}}</ion-label>
                </ion-item>
                <ion-item lines="none">
                    <div v-html="products.description" />
                </ion-item>
            </ion-list>
        </ion-content>

        <ion-footer class="ion-no-border">
            <ion-buttons>
                <ion-button expand="full" full class="chat-add-to-cart-buttons">
                    Chat
                </ion-button>
                <ion-button expand="full" class="chat-add-to-cart-buttons">
                    Add to Cart
                </ion-button>
                <ion-button expand="full" style="--background: var(--ion-color-primary)">
                    Buy Now
                </ion-button>
            </ion-buttons>
        </ion-footer>
    </ion-page>
</template>

<script>
    import ProductAPI from '@/api/product'
    import {
        useRouter
    } from 'vue-router'
    import {
        onMounted,
        ref
    } from '@vue/runtime-core'
    export default {
        setup() {
            onMounted(() => {
                loadProductDetail()
            })
            const router = useRouter()

            let products = ref({})

            function onClickGoBack() {
                router.go(-1)
            }

            function loadProductDetail() {
                const id = router.currentRoute.value.params.id
                ProductAPI.get(id).then((response) => {
                    products.value = response.data.data
                }).catch((err) => {
                    console.error(err);
                })
            }
            return {
                onClickGoBack,
                products
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/global-variables.scss';
    @import '@/assets/css/global.scss';
    @import '@/assets/css/product-detail.scss';
</style>