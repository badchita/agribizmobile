<template>
    <ion-page>
        <ion-header class="ion-no-border">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button />
                </ion-buttons>
                <ion-title>
                    {{userName}}
                </ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <section ref="chatArea" class="chat-area">
                <ion-item lines="none" v-for="(item, i) in conversation" :key="i">
                    <div v-if="item.sender_id === userData.id" class="message-out" slot="end">
                        <ion-label class="ion-text-wrap">
                            {{item.message}}
                        </ion-label>
                    </div>

                    <div v-else-if="item.from_id === userData.id" class="message-in">
                        <ion-label class="ion-text-wrap">
                            {{item.message}}
                        </ion-label>
                    </div>
                </ion-item>
            </section>
        </ion-content>

        <ion-footer>
            <ion-toolbar>
                <ion-item lines="none" colors="none">
                    <ion-textarea autoGrow="true" v-model="userMessage" maxlength="500" rows="1"
                        placeholder="Type message here..."></ion-textarea>
                    <ion-button @click="sendMessage">
                        <ion-icon slot="icon-only" name="send-sharp" />
                    </ion-button>
                </ion-item>
            </ion-toolbar>
        </ion-footer>
    </ion-page>
</template>

<script>
    import ConversationsAPI from '@/api/conversations'

    import {
        computed,
        ref
    } from '@vue/reactivity'
    import {
        useStore
    } from 'vuex'
    import {
      nextTick,
        onMounted
    } from '@vue/runtime-core'
    import {
        useRouter
    } from 'vue-router'
    export default {
        setup() {
            onMounted(() => {
                loadConversation(router.currentRoute.value.params.id)
            })
            const router = useRouter()
            const store = useStore()

            let userMessage = ref('')
            let conversation = ref([])

            const userData = computed(() => store.state.user.userData)
            const chat = computed(() => store.state.chats.chat)

            let userName = computed(() => {
                if (chat.value.sender_id === userData.value.id) {
                    return chat.value.from_username
                } else {
                    return chat.value.sender_username
                }
            })

            async function loadConversation(cId) {
                const params = {
                    id: cId
                }
                console.log(chat.value);
                userName.value = router.currentRoute.value.params.username
                await ConversationsAPI.list(params).then((response) => {
                    conversation.value = response.data.data
                })
            }
            async function sendMessage() {
                var fId
                var fUsername

                console.log();

                if (chat.value.from_id === userData.value.id) {
                    fId = chat.value.sender_id
                    fUsername = chat.value.sender_username
                } else {
                    fId = chat.value.from_id
                    fUsername = chat.value.from_username
                }

                let params = {
                    sender_id: userData.value.id,
                    from_id: fId,
                    from_username: fUsername,
                    sender_username: userData.value.username,
                    message: userMessage.value,
                    conversation_id: chat.value.conversation_id
                }

                await ConversationsAPI.add(params).then(() => {
                    userMessage.value = ''
                    nextTick(() => {
                        loadConversation(chat.value.conversation_id)
                    })
                })
            }
            return {
                userMessage,
                userData,
                conversation,
                sendMessage,
                userName
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/global-variables.scss';
    @import '@/assets/css/global.scss';
    @import '@/assets/css/conversation.scss';
</style>