<template>
    <ion-page>
        <ion-header class="ion-no-border">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button style="color: #58a89d;"></ion-back-button>
                </ion-buttons>
                <ion-title class="header-title">
                    Rate Product
                </ion-title>
                <ion-buttons style="color: #58a89d;" slot="end" @click="onClickSubmit"> Submit
                </ion-buttons>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <ion-item lines="full">
                <ion-thumbnail>
                    <img style="object-fit: contain;" :src="getThumbnail(products.thumbnail_name)" />
                </ion-thumbnail>
                <ion-label class="ion-margin-start">
                    {{products.name}}
                    <br>
                    <h5 style="color: var(--ion-color-medium); font-size: 12px;">
                        ₱{{numberWithCommaFormatt(products.price)}}</h5>
                </ion-label>
            </ion-item>
            <ion-item class="item-starrating" lines="none">
                <StarRating class="star-rating" @update:rating="setRating" :rating="5" :show-rating="false"
                    :star-size="40" :padding="16" :rounded-corners="true" />
            </ion-item>
            <ion-item mode="ios" lines="full">
                <ion-textarea v-model="product_ratings.review" placeholder="Share your experience with others!"
                    rows="9" />
            </ion-item>
            <ion-item>
                <ion-label class="ion-text-wrap">
                    <h2>Be anonymous on your review</h2>
                    <h5 style="color: var(--ion-color-medium);">Your username will be {{username}}</h5>
                </ion-label>
                <ion-toogle mode="ios" color="success" v-model="anonymousValue" :checked="anonymousValue" />
            </ion-item>
        </ion-content>
    </ion-page>
</template>

<script>
    import ProductAPI from '@/api/product'
    import ProductRatingAPI from '@/api/product_ratings'
    import ResourceURL from '@/api/resourceURL'

    import {
        computed,
        onMounted,
        ref,
    } from '@vue/runtime-core'
    import {
        useRouter
    } from 'vue-router'
    import {
        useStore
    } from 'vuex'
    export default {
        setup() {
            onMounted(() => {
                loadProductDetail()
            })

            const router = useRouter()
            const store = useStore()

            let products = ref({})
            let product_ratings = ref({})
            let thumbnailPath = ref('')
            let anonymousValue = ref(false)
            let starRating = ref(5)

            const userData = computed(() => store.state.user.userData)

            let username = computed(() => {
                if (anonymousValue.value === false) {
                    return userData.value.username
                } else {
                    return anonymousWord(userData.value.username)
                }
            })

            function loadProductDetail() {
                const id = router.currentRoute.value.params.id
                ProductAPI.get(id).then((response) => {
                    products.value = response.data.data
                }).catch((err) => {
                    console.error(err);
                })
            }

            function anonymousWord(word) {
                if (word.length < 3) return word
                return word.substring(0, 2) + '*'.repeat(word.length - 2)
            }

            function getThumbnail(fileName) {
                if (fileName) {
                    return thumbnailPath.value = ResourceURL.api + fileName
                } else {
                    return thumbnailPath.value = 'https://www.fcprop.net/images/noimage.png'
                }
            }

            function setRating(rate) {
                starRating.value = rate
            }

            function onClickSubmit() {
                anonymousValue.value === false ? product_ratings.value.anonymous = 0 : product_ratings.value.anonymous =
                    1
                product_ratings.value.user_id = userData.value.id
                product_ratings.value.product_id = +router.currentRoute.value.params.id
                product_ratings.value.rating = starRating.value

                ProductRatingAPI.add(product_ratings.value).then((response) => {
                    console.log(response);
                })
            }

            return {
                products,
                getThumbnail,
                anonymousWord,
                userData,
                anonymousValue,
                username,
                onClickSubmit,
                product_ratings,
                setRating
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/global-variables.scss';
    @import '@/assets/css/global.scss';
    @import '@/assets/css/rate-product';
</style>