<template>
    <ion-page>
        <ion-header>
            <Header title="Log In" />
        </ion-header>

        <ion-content>
            <div class="logo-container">
                <img src="@/assets/images/logo.png" />
            </div>

            <ion-list>
                <ion-item>
                    <div class="ion-margin-end">
                        <ion-icon color="medium" name="mail-outline" />
                    </div>
                    <ion-input v-model="auth.email" placeholder="Email" @IonChange="onChangeEmailPassInput" />
                </ion-item>
                <ion-item>
                    <div style="margin-right: 8px;">
                        <ion-icon color="medium" name="lock-closed-outline" />
                    </div>
                    <ion-input v-model="auth.password" placeholder="Password" :type="passwordVisibility"
                        @IonChange="onChangeEmailPassInput" />
                    <ion-buttons>
                        <ion-button v-if="passwordVisibility === 'password'" @click="onClickIconEyeOff">
                            <ion-icon color="medium" name="eye-off" />
                        </ion-button>
                        <ion-button v-if="passwordVisibility === 'text'" @click="onClickIconEye">
                            <ion-icon color="medium" name="eye" />
                        </ion-button>
                    </ion-buttons>
                    <ion-label>
                        <router-link to="">Forgot?</router-link>
                    </ion-label>
                </ion-item>
                <ion-item v-if="showError" class="error-message-item" lines="none">
                    <ion-button fill="clear" slot="end" @click="onClickCloseErrorIcon">
                        <ion-icon name="close-circle" />
                    </ion-button>
                    <span>{{errorMessage}}</span>
                </ion-item>
                <ion-button class="login-active-button" expand="full" :disabled="loginButtonDisabled"
                    @click="onClickLogin">Log In
                </ion-button>
                <div class="ion-margin-top">
                    <ion-label>
                        <router-link to="/sign-up">Sign up</router-link>
                    </ion-label>
                </div>
                <ion-item class="or-item" lines="none">
                    <ion-label>
                        OR
                    </ion-label>
                </ion-item>
                <ion-button style="--background: #DB4437;" expand="full">
                    <ion-icon name="logo-google" slot="start" />Continue with Google</ion-button>
                <ion-button style="--background: #4267B2;" expand="full">
                    <ion-icon class="ion-margin-start" name="logo-facebook" slot="start" />Continue with Facebook
                </ion-button>
            </ion-list>
            <ion-loading :is-open="openLoading" message="Logging In..."></ion-loading>
        </ion-content>
    </ion-page>
</template>

<script>
    import {
        computed,
        reactive,
        ref
    } from '@vue/reactivity'
    import {
        onMounted
    } from '@vue/runtime-core'
    import {
        useStore
    } from 'vuex'
    import {
        useRouter
    } from 'vue-router'

    export default {
        setup() {
            onMounted(() => {
                onChangeEmailPassInput()
            })
            let auth = reactive({
                email: '',
                password: '',
                password_confirmation: '',
            })

            const router = useRouter()
            const store = useStore()

            let passwordVisibility = ref('password')
            let loginButtonDisabled = ref(true)
            let showError = ref(false)
            let openLoading = ref(false)

            let errorMessage = computed(() => store.state.auth.errorMessage)

            function onClickIconEyeOff() {
                passwordVisibility.value = 'text'
            }

            function onClickIconEye() {
                passwordVisibility.value = 'password'
            }

            function onChangeEmailPassInput() {
                if (auth.email === '' || auth.password === '') {
                    loginButtonDisabled.value = true
                } else {
                    loginButtonDisabled.value = false
                }
            }

            function onClickCloseErrorIcon() {
                showError.value = false
            }

            async function onClickLogin() {
                auth.password_confirmation = auth.password
                openLoading.value = true
                store.dispatch('auth/login', auth).then(() => {
                        setTimeout(() => {
                            store.dispatch('toast/presentToast', {
                                m: 'Successfully Loged In',
                                type: ''
                            })
                        }, 1000)
                        router.push('/tabs/me')
                    }).catch((err) => {
                        console.error(err);
                        showError.value = true
                    })
                    .finally(() => {
                        openLoading.value = false
                    })
            }
            return {
                onClickIconEyeOff,
                onClickIconEye,
                passwordVisibility,
                auth,
                onChangeEmailPassInput,
                loginButtonDisabled,
                onClickLogin,
                onClickCloseErrorIcon,
                showError,
                errorMessage,
                openLoading
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/global-variables.scss';
    @import '@/assets/css/login.scss';
</style>