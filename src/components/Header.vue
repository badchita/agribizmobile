<template>
    <ion-toolbar>
        <ion-buttons slot="start">
            <ion-back-button style="color: #58a89d;" @click="onCLickGoBack"></ion-back-button>
        </ion-buttons>
        <ion-title>
            {{title}}
        </ion-title>
    </ion-toolbar>
</template>

<script>
import { useRouter } from 'vue-router'
    export default {
        props: {
            title: {
                type: String,
                default: ''
            },
        },
        setup() {
            const router = useRouter()
            function onCLickGoBack() {
                router.go(-1)
            }
            return {
                onCLickGoBack
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/header.scss';
</style>