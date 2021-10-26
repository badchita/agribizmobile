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
                        <ion-icon color="medium" name="person-outline" />
                    </div>
                    <ion-input v-model="auth.email" placeholder="Email" @IonChange="onChangeEmailPassInput" />
                </ion-item>
                <ion-item>
                    <div style="margin-right: 8px;">
                        <ion-icon color="medium" name="lock-closed-outline" />
                    </div>
                    <ion-input v-model="auth.password" placeholder="Password" :type="passwordVisibility" @IonChange="onChangeEmailPassInput" />
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
                <ion-button class="login-active-button" expand="full" :disabled="loginButtonDisabled">Log In
                </ion-button>
                <div class="ion-margin-top">
                    <ion-label>
                        <router-link to="">Sign up</router-link>
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
        </ion-content>
    </ion-page>
</template>

<script>
    import {
        reactive,
        ref
    } from '@vue/reactivity'
    import {
        onMounted
    } from '@vue/runtime-core'

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

            let passwordVisibility = ref('password')
            let loginButtonDisabled = ref(true)

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
            return {
                onClickIconEyeOff,
                onClickIconEye,
                passwordVisibility,
                auth,
                onChangeEmailPassInput,
                loginButtonDisabled
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/global-variables.scss';
    @import '@/assets/css/login.scss';
</style>