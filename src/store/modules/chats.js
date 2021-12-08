import {
    make
} from 'vuex-pathify';

const state = {
    chat: {}
}

export default {
    namespaced: true,
    state,
    mutations: {
        ...make.mutations(state),
        SET_CHAT(state, chat) {
            state.chat = chat
        }
    },
    actions: {
        ...make.actions(state),
        async chatDetail({
            commit
        }, {
            c
        }) {
            console.log(c);
            commit('SET_CHAT', c)
        }
    }
}