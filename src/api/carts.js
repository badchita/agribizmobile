import api from './api'

export default {
    list(params) {
        return api.get('/carts', {
            params
        })
    },
    add(params) {
        return api.post('/cart', params)
    },
    delete(id) {
        return api.delete('cart/' + id)
    },
}