<template>
    <ion-page>
        <ion-header class="ion-no-border">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button style="color: #58a89d;" @click="onClickGoBack"></ion-back-button>
                </ion-buttons>
                <ion-title class="ion-margin-end header-title">
                    Ratings
                </ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <ion-list>
                <div v-for="(item, i) in product_ratings" :key="i">
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
            </ion-list>
        </ion-content>
    </ion-page>
</template>

<script>
    import ProductRatingsAPI from '@/api/product_ratings'
    import {
        useRouter
    } from 'vue-router'
    import {
        ref
    } from '@vue/reactivity'
    import {
        onMounted
    } from '@vue/runtime-core'
    export default {
        setup() {
            onMounted(() => {
                loadProductRatings()
            })
            const router = useRouter()

            let product_ratings = ref([])

            function onClickGoBack() {
                router.go(-1)
            }

            function loadProductRatings() {
                const params = {
                    limit: 10,
                    offset: 0,
                    product_id: router.currentRoute.value.params.product_id
                }
                ProductRatingsAPI.list(params).then((response) => {
                    product_ratings.value = response.data.data
                })
            }
            return {
                onClickGoBack,
                product_ratings
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/global-variables.scss';
    @import '@/assets/css/global.scss';
    @import '@/assets/css/product-detail.scss';
</style>