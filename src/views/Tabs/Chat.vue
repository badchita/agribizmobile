<template>
    <ion-page>
        <ion-header class="ion-no-border">
            <ion-toolbar>
                <ion-title class="header-title">
                    Chat
                </ion-title>
            </ion-toolbar>
            <ion-toolbar>
                <ion-searchbar v-model="searchUsername" mode="ios"></ion-searchbar>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
                <ion-refresher-content>
                </ion-refresher-content>
            </ion-refresher>
            <ion-list v-if="searchUsername === ''">
                <ion-item v-for="(item,i) in chats" :key="i" lines="full" button @click="onClickChatItem(item)">
                    <ion-avatar>
                        <img src="https://pickaface.net/gallery/avatar/unr_test_180821_0925_9k0pgs.png">
                    </ion-avatar>
                    <ion-label class="ion-margin-start" v-if="item.sender_id === userData.id">
                        {{item.from_username}} <p class="ion-text-wrap">message</p>
                    </ion-label>
                    <ion-label class="ion-margin-start" v-else>{{item.sender_username}} <p class="ion-text-wrap">message
                        </p>
                    </ion-label>
                </ion-item>
            </ion-list>
            <ion-list v-else>
                <ion-item v-for="(item,i) in searchedUsers" :key="i" lines="full" button @click="onClickChatItem">
                    <ion-avatar>
                        <img src="https://pickaface.net/gallery/avatar/unr_test_180821_0925_9k0pgs.png">
                    </ion-avatar>
                    <ion-label class="ion-margin-start">
                        {{item.username}} <p class="ion-text-wrap">message</p>
                    </ion-label>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-page>
</template>

<script>
    import ChatsAPI from '@/api/chats'

    import {
        computed,
        ref
    } from '@vue/reactivity'
    import {
        useRouter
    } from 'vue-router'
    import {
        onMounted,
        watch
    } from '@vue/runtime-core'
    import {
        useStore
    } from 'vuex'
    export default {
        setup() {
            onMounted(() => {
                loadChats()
            })
            const router = useRouter()
            const store = useStore()

            let searchedUsers = ref([])
            let searchUsername = ref('')
            let chats = ref([])

            const userData = computed(() => store.state.user.userData)

            watch(searchUsername, function (val) {
                loadUsername(val)
            })

            function onClickChatItem(item) {
                store.dispatch('chats/chatDetail', {
                    c: item
                })
                
                router.push(`/conversation/${item.conversation_id}`)
            }

            function doRefresh(event) {
                if (userData.value.id) {
                    loadChats().finally(() => {
                        setTimeout(() => {
                            if (event)
                                event.target.complete()
                        }, 500)
                    })
                } else {
                    setTimeout(() => {
                        if (event)
                            event.target.complete()
                    }, 500)
                }
            }

            async function loadUsername(username) {
                await ChatsAPI.search(username).then((response) => {
                    searchedUsers.value = response.data.data
                })
            }
            async function loadChats() {
                let params = {
                    id: userData.value.id
                }

                await ChatsAPI.list(params).then((response) => {
                    chats.value = response.data.data
                })
            }

            return {
                onClickChatItem,
                loadUsername,
                searchedUsers,
                searchUsername,
                userData,
                doRefresh,
                chats
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/global-variables.scss';
    @import '@/assets/css/global.scss';
</style>