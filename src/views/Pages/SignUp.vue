<template>
    <ion-page>
        <ion-header>
            <Header title="Sign Up" />
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
                    <ion-input v-model="register.name" placeholder="Name" />
                </ion-item>
                <ion-item>
                    <div class="ion-margin-end">
                        <ion-icon color="medium" name="person-outline" />
                    </div>
                    <ion-input v-model="register.username" placeholder="Username" />
                </ion-item>
                <ion-item>
                    <div class="ion-margin-end">
                        <ion-icon color="medium" name="mail-outline" />
                    </div>
                    <ion-input v-model="register.email" type="email" placeholder="Email" />
                </ion-item>
                <ion-item>
                    <div class="ion-margin-end">
                        <ion-icon color="medium" name="phone-portrait-outline" />
                    </div>
                    <ion-input v-model="register.mobile" type="tel" placeholder="Mobile" />
                </ion-item>
                <ion-item>
                    <div class="ion-margin-end">
                        <ion-icon color="medium" name="calendar-outline" />
                    </div>
                    <ion-datetime display-format="MM/DD/YYYY" placeholder="Birth Date"
                        @ionChange="onChangeGetBithday($event)" />
                </ion-item>
                <ion-item>
                    <div class="ion-margin-end">
                        <ion-icon color="medium" name="lock-closed-outline" />
                    </div>
                    <ion-input v-model="register.password" placeholder="Password" :type="passwordVisibility" />
                    <ion-buttons>
                        <ion-button v-if="passwordVisibility === 'password'" @click="onClickIconEyeOff">
                            <ion-icon color="medium" name="eye-off" />
                        </ion-button>
                        <ion-button v-if="passwordVisibility === 'text'" @click="onClickIconEye">
                            <ion-icon color="medium" name="eye" />
                        </ion-button>
                    </ion-buttons>
                </ion-item>
                <ion-item>
                    <div class="ion-margin-end">
                        <ion-icon color="medium" name="lock-closed-outline" />
                    </div>
                    <ion-input v-model="register.password_confirmation" placeholder="Confirm Password"
                        :type="confirmPasswordVisibility" />
                    <ion-buttons>
                        <ion-button v-if="confirmPasswordVisibility === 'password'"
                            @click="onClickIconEyeOffConfirmPass">
                            <ion-icon color="medium" name="eye-off" />
                        </ion-button>
                        <ion-button v-if="confirmPasswordVisibility === 'text'" @click="onClickIconEyeConfirmPass">
                            <ion-icon color="medium" name="eye" />
                        </ion-button>
                    </ion-buttons>
                </ion-item>
                <ion-item v-if="showError" class="error-message-item" lines="none">
                    <ion-button fill="clear" slot="end" @click="onClickCloseErrorIcon">
                        <ion-icon name="close-circle" />
                    </ion-button>
                    <span>{{errorMessage}}</span>
                </ion-item>
                <ion-button class="login-active-button" expand="full" @click="onClickSignUp">Sign Up
                </ion-button>
                <div class="ion-margin-top">
                    <ion-label>
                        <router-link to="/login">Log In</router-link>
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
        computed,
        reactive,
        ref
    } from '@vue/reactivity'
    import {
        loadingController
    } from '@ionic/core'
    import {
        useStore
    } from 'vuex';
    import {
        useRouter
    } from 'vue-router';
    export default {
        setup() {
            let register = reactive({
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
                mobile: '',
                birthday: '',
                user_type: 'Seller',
                type: 0
            })

            let passwordVisibility = ref('password')
            let confirmPasswordVisibility = ref('password')
            let showError = ref(false)

            const store = useStore()
            const router = useRouter()

            let isLoading = computed(() => store.state.loading.status);
            let errorMessage = computed(() => store.state.auth.errorMessage)

            function onClickIconEyeOff() {
                passwordVisibility.value = 'text'
            }

            function onClickIconEye() {
                passwordVisibility.value = 'password'
            }

            function onClickIconEyeOffConfirmPass() {
                confirmPasswordVisibility.value = 'text'
            }

            function onClickIconEyeConfirmPass() {
                confirmPasswordVisibility.value = 'password'
            }

            function onChangeGetBithday(ev) {
                register.birthday = ev.detail.value
                register.birthday = new Date(register.birthday).toISOString().substring(0, 10)
            }

            function onClickCloseErrorIcon() {
                showError.value = false
            }

            function onClickSignUp() {
                register.mobile = +register.mobile
                presentLoading()
                store.dispatch('auth/register', register).then(() => {
                    setTimeout(() => {
                        store.dispatch('toast/presentToast', {
                            m: 'Account Created',
                            type: ''
                        })
                    }, 2000)
                    router.push('/login')
                }).catch((err) => {
                    console.error(err);
                    showError.value = true
                    store.dispatch('loading/finish')
                }).finally(() => {
                    store.dispatch('loading/finish')
                })
            }

            async function presentLoading() {
                store.dispatch('loading/start')
                return await loadingController.create({
                        message: 'Creating Account...'
                    })
                    .then(loading => {
                        loading.present()
                            .then(() => {
                                setTimeout(() => {
                                    if (!isLoading.value)
                                        loading.dismiss()
                                }, 500)
                            })
                    })
            }

            return {
                onClickIconEyeOff,
                onClickIconEye,
                passwordVisibility,
                confirmPasswordVisibility,
                onClickIconEyeOffConfirmPass,
                onClickIconEyeConfirmPass,
                onClickSignUp,
                register,
                onChangeGetBithday,
                onClickCloseErrorIcon,
                showError,
                errorMessage
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/global-variables.scss';
    @import '@/assets/css/login.scss';
</style>