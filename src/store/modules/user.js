import UserAPI from '@/api/user'
import {
    make
} from 'vuex-pathify';

const state = {
    userData: {}
}

export default {
    namespaced: true,
    state,
    getters: make.getters(state),
    mutations: make.mutations(state),
    actions: {
        ...make.actions(state),
        async loadUserData({
            commit
        }, id) {
            await UserAPI.get(id).then((response) => {
                commit('SET_USER_DATA', response.data.data)
            })
        },
        async updateUserData({
            commit
        }, payload) {
            await UserAPI.update(payload).then((response) => {
                commit('SET_USER_DATA', response.data.data)
            })
        },
        removeUserData({
            commit
        }) {
            console.log('remove');
            commit('SET_USER_DATA', {})
        }
    }
}