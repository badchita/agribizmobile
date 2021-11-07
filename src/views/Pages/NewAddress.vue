<template>
    <ion-page>
        <ion-header>
            <Header title="New Address" />
        </ion-header>

        <ion-content>
            <ion-list lines="full" class="ion-no-margin">
                <ion-item>
                    <ion-label>Full Name:</ion-label>
                    <ion-input v-model="address.name" placeholder="Set Full Name" type="text" />
                </ion-item>
                <ion-item>
                    <ion-label>Mobile:</ion-label>
                    <ion-input v-model="address.mobile" placeholder="Set Mobile Number" type="tel" />
                </ion-item>
                <ion-item>
                    <ion-label>Street/Bldg:</ion-label>
                    <ion-input v-model="address.street_building" placeholder="Set Street/Bldg" type="text" />
                </ion-item>
                <ion-item>
                    <ion-label>Brangay:</ion-label>
                    <ion-input v-model="address.barangay" placeholder="Set Brangay" type="text" />
                </ion-item>
                <ion-item>
                    <ion-label>City:</ion-label>
                    <ion-input v-model="address.city" placeholder="Set City" type="text" />
                </ion-item>
                <ion-item>
                    <ion-label>Province:</ion-label>
                    <ion-input v-model="address.province" placeholder="Set Province" type="text" />
                </ion-item>
            </ion-list>
        </ion-content>

        <ion-footer>
            <ion-toolbar>
                <ion-button expand="full" @click="onClickSubmit">
                    <ion-spinner v-if="loadingStatus"></ion-spinner>
                    <span v-else>Submit</span>
                </ion-button>
            </ion-toolbar>
        </ion-footer>
    </ion-page>
</template>

<script>
    import AddressesAPI from '@/api/addresses'

    import {
        computed,
        ref
    } from '@vue/reactivity'
    import {
        useStore
    } from 'vuex'
    import {
        useRouter
    } from 'vue-router'
    export default {
        setup() {
            const store = useStore()
            const router = useRouter()

            let address = ref({})

            let userId = computed(() => store.state.user.userData.id)
            let loadingStatus = computed(() => store.state.loading.status)

            function clearForm() {
                address.value = {}
            }

            function goBack() {
                router.go(-1)
            }

            function onClickSubmit() {
                address.value.user_id = userId.value
                store.dispatch('loading/start')
                AddressesAPI.add(address.value).then(() => {
                    setTimeout(() => {
                        store.dispatch('toast/presentToast', {
                            m: 'Address Added',
                            type: ''
                        })
                    }, 1000)
                    clearForm()
                    goBack()
                }).finally(() => {
                    store.dispatch('loading/finish')
                })
            }

            return {
                address,
                onClickSubmit,
                loadingStatus
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/global-variables.scss';
    @import '@/assets/css/global.scss';

    ion-button {
        margin: auto;
        width: 96%;
        text-align: center;
        --box-shadow: none;
        --background: #58a89d;
    }
</style>