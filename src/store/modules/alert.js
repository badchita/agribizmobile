import {
    make
} from 'vuex-pathify';
import {
    alertController
} from '@ionic/vue';

const state = {
    toast: ''
}

export default {
    namespaced: true,
    state,
    mutations: {
        ...make.mutations(state),
    },
    actions: {
        ...make.actions(state),
        async presentAlert({
            commit
        }, {
            h,
            m,
            path,
        }) {
            // const router = useRouter()
            const alert = await alertController.create({
                header: h,
                message: m,
                buttons: [{
                    text: 'Cancel',
                    role: 'cancel',
                }, {
                    text: 'Proceed',
                    handler: (() => {
                        path
                    })
                }]
            })
            commit('SET_TOAST', m)
            return alert.present();
        }
    }
}