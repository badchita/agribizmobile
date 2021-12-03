<template>
    <ion-page>
        <ion-header>
            <Header title="Address Selection" />
        </ion-header>

        <ion-content>
            <div v-if="address.length !== 0">
                <ion-item v-for="(item, i) in address" :key="i" class="ion-margin-bottom" lines="none" button
                    @click="onClickSelectAddress(item)">
                    <ion-label class="detail-label">
                        <label class="name-label ion-margin-end">{{item.name}}</label>
                        <ion-icon v-if="userData.address_id === item.id" size="small" style="color: #58a89d;"
                            name="checkmark" /> <br>
                        <label>{{item.mobile}}</label> <br>
                        <label>{{item.street_building}}</label> <br>
                        <label>{{item.barangay}}, {{item.city}}</label> <br>
                        <label>{{item.province}}</label>
                    </ion-label>
                </ion-item>
            </div>

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
    import AddressesAPI from '@/api/addresses'

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
    export default {
        setup() {
            onMounted(() => {
                loadAddresses()
            })

            const router = useRouter()
            const store = useStore()

            let address = ref({})

            let userData = computed(() => store.state.user.userData)
            watch(userData, function () {
                loadAddresses()
            })

            function onClickNewAddress() {
                router.push(`/new-address`)
            }

            function loadAddresses() {
                const params = {
                    offset: 0,
                    limit: 10,
                    user_id: router.currentRoute.value.params.user_id,
                    status: 'O',
                }
                AddressesAPI.list(params).then((response) => {
                    address.value = response.data
                })
            }

            function onClickSelectAddress(item) {
                userData.value.address_id = item.id
                store.dispatch('user/updateUserData', userData.value).then(() => {
                    router.go(-1)
                })
            }
            return {
                onClickNewAddress,
                address,
                onClickSelectAddress,
                userData
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/global-variables.scss';
    @import '@/assets/css/global.scss';
    @import '@/assets/css/address-selection.scss';
</style>