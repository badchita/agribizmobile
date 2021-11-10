<template>
    <ion-page>
        <ion-content class="splash-content">
            <ion-list class="splash-list">
                <ion-row class="ion-align-items-center">
                    <ion-col class="ion-justify-content-center ion-text-center">
                        <img id="logo" src="@/assets/images/logo.png" />
                    </ion-col>
                </ion-row>
            </ion-list>
        </ion-content>
    </ion-page>
</template>

<script>
    import {
        onMounted
    } from '@vue/runtime-core'
    import {
        useRouter
    } from 'vue-router'
    export default {
        setup() {
            onMounted(() => {
                setTimeout(() => {
                    router.push(`/tabs/`)
                }, 2000)
            })

            const router = useRouter()
            return {}
        }
    }
</script>

<style lang="scss" scoped>
    .splash-content {
        .splash-list {
            background: #f2f5f7;
            width: 100%;
            height: 100vh;

            ion-row {
                width: 100%;
                height: 100%;
            }

            img {
                animation: drop 1.5s ease;
            }

        }
    }

    @keyframes drop {
        0% {
            opacity: 0;
            transform: translateY(-80px);
        }

        100% {
            opacity: 1;
            transform: translateY(0px);
        }
    }
</style>