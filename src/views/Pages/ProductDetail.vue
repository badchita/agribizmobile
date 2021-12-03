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
            <!-- <ion-slides pager>
                <ion-slide v-for="(item, i) in 3" :key="i">
                    
                </ion-slide>
            </ion-slides> -->
            <img style="object-fit: contain;" width="420" height="310" :src="getThumbnail(products.thumbnail_name)" />
            <ion-item-group>
                <ion-item lines="none">
                    <ion-badge :color="products.product_status === 'Available' ? 'primary' : 'danger'">
                        {{products.product_status}}</ion-badge>
                    <ion-label class="ion-margin-start" style="font-size: 18px;">
                        {{products.name}}
                    </ion-label>
                </ion-item>
                <ion-item lines="none">
                    <ion-label style="color: #58a89d;">
                        ₱{{numberWithCommaFormatt(products.price)}}
                    </ion-label>
                </ion-item>
                <ion-item lines="none">
                    <StarRating style="margin-left: 8px;" :rating="4" :show-rating="true" :read-only="true"
                        :star-size="14" :padding="6" :rounded-corners="true" />
                    <ion-label class="ion-margin-start" color="medium" style="font-size: 14px;">Stocks:
                        {{products.quantity}}</ion-label>
                    <ion-button v-if="!likeButtonStatus" fill="clear" color="medium" @click="onClickLike()">
                        <ion-icon slot="icon-only" name="heart-outline" />
                    </ion-button>
                    <ion-button v-if="likeButtonStatus" fill="clear" color="medium" @click="onClickLike()">
                        <ion-icon slot="icon-only" color="danger" name="heart" />
                    </ion-button>
                    <p>{{like_products.length}}</p>
                </ion-item>
                <ion-item class="ion-margin-top" lines="none">
                    <ion-row class="shipping-row">
                        <ion-col size="10">
                            <ion-label v-if="addresses_detail.shipping_fee === 0">
                                <ion-icon class="ion-margin-end" color="success" name="bus" /> Free Shipping
                            </ion-label>
                            <ion-label v-else>
                                <ion-icon class="ion-margin-end" color="success" name="bus" />
                            </ion-label>
                        </ion-col>
                        <ion-col size="10">
                            <ion-label class="ion-text-wrap">
                                <ion-icon class="ion-margin-end" name="airplane-outline" /> Shipping from
                                {{products.product_location}}
                            </ion-label>
                        </ion-col>
                        <ion-col size="10">
                            <ion-label>
                                Cost: ₱{{numberWithCommaFormatt(addresses_detail.shipping_fee)}}
                            </ion-label>
                        </ion-col>
                    </ion-row>
                    <ion-icon slot="end" color="medium" name="chevron-forward" />
                </ion-item>
                <ion-item class="ion-margin-top" lines="none">
                    <ion-label style="font-size: 14px;" mode="ios">Quantity</ion-label>
                    <ion-input type="number" min="0" v-model="quantity" />
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
                            <ion-label>{{seller.username}}</ion-label>
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
                <ion-item v-if="seeMore" lines="none">
                    <div class="product-description" v-html="products.description" />
                </ion-item>
                <ion-item lines="none" class="ion-text-center" button @click="onClickSeeMore">
                    <ion-label v-if="!seeMore" class="show-label">Show More
                        <ion-icon name="chevron-down-outline" />
                    </ion-label>
                    <ion-label v-else class="show-label">Show Less
                        <ion-icon name="chevron-up-outline" />
                    </ion-label>
                </ion-item>
            </ion-list>

            <ion-item v-if="product_ratings.length === 0" class="ion-margin-top" lines="none">
                <ion-label>
                    <h3>No ratings yet</h3>
                </ion-label>
            </ion-item>

            <ion-list v-else class="ion-margin-top">
                <ion-list-header>
                    <strong>Product Ratings</strong>
                    <ion-label style="color: #58a89d; text-align: right;" @click="onClickSeeAllRatings">See All
                        <ion-icon name="chevron-forward" />
                    </ion-label>
                </ion-list-header>
                <StarRating style="margin-left: 16px;" :rating="5" :show-rating="true" :read-only="true" :star-size="16"
                    :padding="4" :rounded-corners="true" />
                <div v-for="(item, i) in product_ratings" :key="i" class="ion-margin-top">
                    <ion-item lines="none">
                        <ion-avatar slot="start">
                            <img src="https://pickaface.net/gallery/avatar/unr_test_180821_0925_9k0pgs.png">
                        </ion-avatar>
                        <ion-label>
                            <h2 v-if="item.anonymous === 0" style="margin-bottom: 8px;">{{item.user.username}}
                            </h2>
                            <h2 v-else style="margin-bottom: 8px;">{{anonymousWord(item.user.username)}}
                            </h2>
                            <StarRating :rating="item.rating" :show-rating="false" :read-only="true" :star-size="14"
                                :padding="4" :rounded-corners="true" />
                        </ion-label>
                        <ion-icon size="small" name="ellipsis-horizontal" />
                    </ion-item>
                    <ion-item lines="full">
                        <ion-label style="margin-left: 54px;">
                            <p class="ion-text-wrap">
                                {{item.review}}
                            </p>
                            <p style="margin-top: 16px;">
                                {{formatDate(item.created_at)}}
                            </p>
                        </ion-label>
                    </ion-item>
                </div>
                <ion-item lines="none" class="ion-text-center" button @click="onClickSeeAllRatings">
                    <ion-label style="color: #58a89d;">
                        See All Reviews ({{reviewsLength}})
                        <ion-icon name="chevron-forward" />
                    </ion-label>
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
                <ion-button v-if="products.product_status === 'Available'" expand="full"
                    style="--background: var(--ion-color-primary)" :disabled="buttonDisabled" @click="onClickBuy">
                    <ion-label>Buy Now</ion-label>
                </ion-button>
                <ion-button v-else expand="full"
                    style="--background: var(--ion-color-danger); --ripple-color: transparent;">
                    <ion-label>Out of Stocks</ion-label>
                </ion-button>
            </ion-buttons>
        </ion-footer>
    </ion-page>
</template>

<script>
    import ProductAPI from '@/api/product'
    import LikeProductsAPI from '@/api/like_products'
    import ResourceURL from '@/api/resourceURL'

    import {
        useRouter
    } from 'vue-router'
    import {
        computed,
        onMounted,
        ref,
        watch
    } from '@vue/runtime-core'
    import {
        useStore
    } from 'vuex'
    import {
        alertController
    } from '@ionic/core'
    export default {
        setup() {
            onMounted(() => {
                loadProductDetail()
                loadLikeProducts()
            })
            const router = useRouter()
            const store = useStore()

            let products = ref({})
            let seller = ref({})
            let seeMore = ref(false)
            let quantity = ref(0)
            let addresses_detail = ref({})
            let like_products = ref([])
            let product_ratings = ref([])
            let likeButtonStatus = ref(false)
            let thumbnailPath = ref('')
            let buttonDisabled = ref(false)
            let reviewsLength = ref(0)

            let isUserLoggedIn = computed(() => store.state.auth.isUserLoggedIn)
            let userId = computed(() => store.state.user.userData.id)

            watch(quantity, function (v) {
                if (v > products.value.quantity) {
                    store.dispatch('toast/presentToast', {
                        m: '<strong>Not Enough</strong> Stocks',
                        type: 'error'
                    })
                    buttonDisabled.value = true
                } else {
                    buttonDisabled.value = false
                }
            })

            function onClickGoBack() {
                router.go(-1)
            }

            function onClickSeeMore() {
                seeMore.value === true ? seeMore.value = false : seeMore.value = true;
            }

            function onClickBuy() {
                if (!isUserLoggedIn.value) {
                    presentAlert()
                } else {
                    if (quantity.value === 0) {
                        store.dispatch('toast/presentToast', {
                            m: '<strong>Quantity</strong> Must Not Be <strong>0</strong>',
                            type: 'error'
                        })
                    } else {
                        const id = router.currentRoute.value.params.id
                        router.push(`/checkout/${quantity.value}/${id}`)
                    }
                }
            }

            function loadProductDetail() {
                const id = router.currentRoute.value.params.id
                ProductAPI.get(id).then((response) => {
                    products.value = response.data.data
                    seller.value = response.data.data.seller
                    addresses_detail.value = response.data.data.addresses_detail

                    product_ratings.value = response.data.data.product_ratings
                    reviewsLength.value = response.data.data.product_ratings.length
                    if (product_ratings.value.length > 3)
                        product_ratings.value.splice(3)
                }).catch((err) => {
                    console.error(err);
                })
            }

            function loadLikeProducts() {
                const productId = router.currentRoute.value.params.id

                LikeProductsAPI.list(userId.value, +productId).then((response) => {
                    like_products.value = response.data
                    like_products.value.forEach((value) => {
                        if (value.user_id === userId.value && value.product_id === +productId && value
                            .status === 'V') {
                            likeButtonStatus.value = false
                        } else if (value.user_id === userId.value && value.product_id === +productId &&
                            value.status === 'O') {
                            likeButtonStatus.value = true
                        }
                    })
                })
            }

            function onClickLike() {
                const productId = router.currentRoute.value.params.id

                // const payload = {
                //     product_id: productId,
                //     user_id: userId.value,
                //     status: 'O'
                // }

                like_products.value.forEach((value) => {
                    if (value.product_id === +productId && value.user_id === userId.value && value.status ===
                        'O') {
                        value.status = 'V'
                        LikeProductsAPI.archive(value).then(() => {
                            loadLikeProducts()
                        })
                    } else if (value.product_id === +productId && value.user_id === userId.value && value
                        .status === 'V') {
                        value.status = 'O'
                        LikeProductsAPI.archive(value).then(() => {
                            loadLikeProducts()
                        })
                    }
                    // else {
                    //     LikeProductsAPI.add(payload).then(() => {
                    //         loadLikeProducts()
                    //     })
                    // }
                })
                // const payload = {
                //     product_id: productId,
                //     user_id: userId.value,
                //     status: 'O'
                // }
                // console.log(payload);
                // LikeProductsAPI.add(payload).then(() => {
                //     loadLikeProducts()
                // })
            }

            function getThumbnail(fileName) {
                if (fileName) {
                    return thumbnailPath.value = ResourceURL.api + fileName
                } else {
                    return thumbnailPath.value = 'https://www.fcprop.net/images/noimage.png'
                }
            }

            function onClickSeeAllRatings() {
                const product_id = products.value.id
                router.push(`/product-ratings/${product_id}`)
            }

            async function presentAlert() {
                const alert = await alertController.create({
                    header: 'Must Be Logged In',
                    message: 'Proceed to Login',
                    buttons: [{
                        text: 'Cancel',
                        role: 'cancel',
                    }, {
                        text: 'Proceed',
                        handler: (() => {
                            router.push(`/login`)
                        })
                    }]
                })
                alert.present();
            }
            return {
                onClickGoBack,
                products,
                seller,
                seeMore,
                onClickSeeMore,
                onClickBuy,
                quantity,
                addresses_detail,
                isUserLoggedIn,
                onClickLike,
                like_products,
                userId,
                likeButtonStatus,
                getThumbnail,
                buttonDisabled,
                product_ratings,
                reviewsLength,
                onClickSeeAllRatings
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/global-variables.scss';
    @import '@/assets/css/global.scss';
    @import '@/assets/css/product-detail.scss';
</style>