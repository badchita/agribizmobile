<template>
    <ion-toolbar>
        <ion-buttons slot="start">
            <ion-back-button style="color: #58a89d;"></ion-back-button>
        </ion-buttons>
        <ion-title>
            Login
        </ion-title>
    </ion-toolbar>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                default: ''
            },
        },
        setup() {


            return {}
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/header.scss';
</style>