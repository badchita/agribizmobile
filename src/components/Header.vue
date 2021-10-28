<template>
    <ion-toolbar>
        <ion-buttons slot="start">
            <ion-back-button style="color: #58a89d;" @click="onClickGoBack"></ion-back-button>
        </ion-buttons>
        <ion-title class="ion-margin-end header-title">
            {{title}}
        </ion-title>
        <ion-buttons class="ion-margin-start" slot="end">
        </ion-buttons>
    </ion-toolbar>
</template>

<script>
    import {
        useRouter
    } from 'vue-router'
    export default {
        props: {
            title: {
                type: String,
                default: ''
            },
        },
        setup() {
            const router = useRouter()

            function onClickGoBack() {
                router.go(-1)
            }
            return {
                onClickGoBack
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/global-variables.scss';
    @import '@/assets/css/global.scss';
    @import '@/assets/css/header.scss';
</style>