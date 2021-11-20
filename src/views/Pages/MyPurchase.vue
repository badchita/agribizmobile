<template>
    <ion-page>
        <ion-header class="ion-no-border">
            <Header title="My Purchases" />
            <ion-toolbar>
                <ion-segment scrollable="true" :value="activeSegment" @ionChange="onIonChangeSegment($event)">
                    <ion-segment-button v-for="item in segments" :key="item" :value="item.value" @click="onClickSegmentButton($event)">
                        <ion-label>{{item.text}}</ion-label>
                    </ion-segment-button>
                </ion-segment>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            
        </ion-content>
    </ion-page>
</template>

<script>
    import {
        ref
    } from '@vue/reactivity'
    import {
        useRouter
    } from 'vue-router'
    export default {
        setup() {
            const router = useRouter()

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
                {
                    value: 'returnrefund',
                    text: 'Return Refund'
                }
            ]

            let activeSegment = ref(router.currentRoute.value.params.segment)

            function onIonChangeSegment(ev) {
                activeSegment.value = ev.detail.value;
            }

            function onClickSegmentButton(ev) {
                ev.target.scrollIntoView({
                    behavior: 'smooth',
                    inline: 'center'
                });
            }
            return {
                segments,
                onIonChangeSegment,
                activeSegment,
                onClickSegmentButton
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/global-variables.scss';
    @import '@/assets/css/global.scss';
    @import '@/assets/css/my-purchase.scss';
</style>