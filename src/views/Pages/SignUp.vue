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
                    <ion-input placeholder="Name" />
                </ion-item>
                <ion-item>
                    <div class="ion-margin-end">
                        <ion-icon color="medium" name="person-outline" />
                    </div>
                    <ion-input placeholder="Username" />
                </ion-item>
                <ion-item>
                    <div class="ion-margin-end">
                        <ion-icon color="medium" name="phone-portrait-outline" />
                    </div>
                    <ion-input placeholder="Mobile" />
                </ion-item>
                <ion-item>
                    <div class="ion-margin-end">
                        <ion-icon color="medium" name="calendar-outline" />
                    </div>
                    <ion-datetime placeholder="Birthday" />
                </ion-item>
                <ion-item>
                    <div class="ion-margin-end">
                        <ion-icon color="medium" name="lock-closed-outline" />
                    </div>
                    <ion-input placeholder="Password" :type="passwordVisibility" />
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
                    <ion-input placeholder="Confirm Password" :type="confirmPasswordVisibility" />
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
                <ion-button class="login-active-button" expand="full" :disabled="loginButtonDisabled">Sign Up
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
        ref
    } from '@vue/reactivity'
    export default {
        setup() {
            let passwordVisibility = ref('password')
            let confirmPasswordVisibility = ref('password')

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
            return {
                onClickIconEyeOff,
                onClickIconEye,
                passwordVisibility,
                confirmPasswordVisibility,
                onClickIconEyeOffConfirmPass,
                onClickIconEyeConfirmPass
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/global-variables.scss';
    @import '@/assets/css/login.scss';
</style>