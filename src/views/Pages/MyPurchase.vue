<template>
    <ion-page>
        <ion-header class="ion-no-border">
            <Header title="My Purchases" />
            <ion-toolbar>
                <ion-segment scrollable="true" :value="activeSegment" @ionChange="onIonChangeSegment($event)">
                    <ion-segment-button v-for="item in segments" :key="item" :value="item.value"
                        @click="onClickSegmentButton($event)">
                        <ion-label>{{item.text}}</ion-label>
                    </ion-segment-button>
                </ion-segment>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
                <ion-refresher-content>
                </ion-refresher-content>
            </ion-refresher>
            <PendingOrders v-if="activeSegment === 'pending'" :pendingOrders="pendingOrders" />
            <AcceptedOrders v-if="activeSegment === 'accepted'" :acceptedOrders="acceptedOrders" />
            <ToRecieveOrders v-if="activeSegment === 'torecieve'" :toRecieveOrders="toRecieveOrders" />
            <DeliveredOrders v-if="activeSegment === 'delivered'" :deliveredOrders="deliveredOrders" />
            <CompletedOrders v-if="activeSegment === 'completed'" :completedOrders="completedOrders" />
            <CancelledOrders v-if="activeSegment === 'cancelled'" :cancelledOrders="cancelledOrders" />
        </ion-content>
    </ion-page>
</template>

<script>
    import OrdersAPI from '@/api/orders'

    import PendingOrders from '@/components/MyPurchase/PendingOrders'
    import AcceptedOrders from '@/components/MyPurchase/AcceptedOrders'
    import ToRecieveOrders from '@/components/MyPurchase/ToRecieveOrders'
    import DeliveredOrders from '@/components/MyPurchase/DeliveredOrders'
    import CompletedOrders from '@/components/MyPurchase/CompletedOrders'
    import CancelledOrders from '@/components/MyPurchase/CancelledOrders'

    import {
        computed,
        ref
    } from '@vue/reactivity'
    import {
        useRouter
    } from 'vue-router'
    import {
        onMounted
    } from '@vue/runtime-core'
    import {
        useStore
    } from 'vuex'
    export default {
        components: {
            PendingOrders,
            AcceptedOrders,
            ToRecieveOrders,
            DeliveredOrders,
            CompletedOrders,
            CancelledOrders
        },
        setup() {
            onMounted(() => {
                loadOrders(userData.value.id)
            })

            const router = useRouter()
            const store = useStore()

            const segments = [{
                    value: 'pending',
                    text: 'Pending'
                },
                {
                    value: 'accepted',
                    text: 'Accepted'
                },
                {
                    value: 'torecieve',
                    text: 'To Recieve'
                },
                {
                    value: 'delivered',
                    text: 'Delivered'
                },
                {
                    value: 'completed',
                    text: 'Completed'
                },
                {
                    value: 'cancelled',
                    text: 'Cancelled'
                },
            ]

            let activeSegment = ref(router.currentRoute.value.params.segment)
            let orders = ref([])
            let pendingOrders = ref([])
            let acceptedOrders = ref([])
            let toRecieveOrders = ref([])
            let deliveredOrders = ref([])
            let completedOrders = ref([])
            let cancelledOrders = ref([])

            // let delivered = ref(null)

            let userData = computed(() => store.state.user.userData)

            function test() {
                console.log('test');
            }

            function onIonChangeSegment(ev) {
                activeSegment.value = ev.detail.value;
            }

            function onClickSegmentButton(ev) {
                ev.target.scrollIntoView({
                    behavior: 'smooth',
                    inline: 'center'
                });
            }

            function loadOrders(id) {
                console.log(id);
                const params = {
                    user_id: id
                }
                OrdersAPI.list(params).then((response) => {
                    orders.value = response.data.data
                    getOrderStatus(orders.value)
                })
            }

            function doRefresh(event) {
                if (userData.value.id) {
                    loadOrders(userData.value.id)
                    setTimeout(() => {
                        if (event)
                            event.target.complete()
                    }, 500)
                } else {
                    setTimeout(() => {
                        if (event)
                            event.target.complete()
                    }, 500)
                }
            }

            function getOrderStatus(o) {
                pendingOrders.value = []
                acceptedOrders.value = []
                toRecieveOrders.value = []
                deliveredOrders.value = []
                completedOrders.value = []
                cancelledOrders.value = []
                o.forEach((value) => {
                    switch (value.order_status) {
                        case '0':
                            pendingOrders.value.push(value)
                            break
                        case '1':
                            acceptedOrders.value.push(value)
                            break
                        case '2':
                            toRecieveOrders.value.push(value)
                            break
                        case '3':
                            deliveredOrders.value.push(value)
                            break
                        case '4':
                            completedOrders.value.push(value)
                            break
                        case '-1':
                            cancelledOrders.value.push(value)
                            break
                    }
                })
            }
            return {
                segments,
                onIonChangeSegment,
                activeSegment,
                onClickSegmentButton,
                pendingOrders,
                acceptedOrders,
                toRecieveOrders,
                deliveredOrders,
                completedOrders,
                test,
                doRefresh,
                cancelledOrders
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/global-variables.scss';
    @import '@/assets/css/global.scss';
    @import '@/assets/css/my-purchase.scss';
</style>