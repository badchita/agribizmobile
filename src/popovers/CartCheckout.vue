<template>
    <div>
        <ion-content>
            <ion-item lines="none">
                <ion-label>
                    Quantity: 
                </ion-label>
                <ion-input type="number" min="0" :max="cart.product_details.quantity" v-model="quantity">
                </ion-input>
            </ion-item>
            <ion-item v-if="warning" lines="none">
                <ion-label color="danger">{{warningMessage}}</ion-label>
            </ion-item>
        </ion-content>
        <ion-footer class="ion-no-border">
            <ion-button :disabled="warning ? true : false" expand="full" @click="onClickCheckout">
                Checkout
            </ion-button>
        </ion-footer>
    </div>
</template>

<script>
    import {
        ref
    } from '@vue/reactivity'
    import {
        watch
    } from '@vue/runtime-core'
    import {
        useRouter
    } from 'vue-router'
    import {
        popoverController
    } from '@ionic/core'
    export default {
        props: {
            cart: {
                type: Object,
                default: function () {}
            },
        },
        setup(props) {
            const router = useRouter()

            let quantity = ref(0)
            let warning = ref(false)
            let warningMessage = ref('')

            watch(quantity, function (v) {
                if (v > props.cart.product_details.quantity) {
                    warningMessage.value = 'Maximum Quantity'
                    warning.value = true
                } else {
                    warning.value = false
                }
            })

            function onClickCheckout(id) {
                if (quantity.value === 0) {
                    warning.value = true
                    warningMessage.value = 'Quantity Must Not Be 0'
                } else if(quantity.value > 0){
                    id = props.cart.product_details.id
                    router.push(`/checkout/${quantity.value}/${id}`)

                    popoverController.dismiss()
                }
            }
            return {
                quantity,
                warning,
                onClickCheckout,
                warningMessage
            }
        }
    }
</script>

<style lang="scss" scoped>
    ion-button {
        float: right;
        text-transform: none;
        height: 30px;
        --box-shadow: none;
    }
</style>