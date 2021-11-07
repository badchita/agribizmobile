import api from './api'

export default {
    list(user_id, product_id) {
        if (user_id) {
            return api.get(`like_products/${product_id}/${user_id}`)
        } else {
            return api.get(`like_products/${product_id}`)
        }
    },
    add(payload) {
        return api.post(`like_products`, payload)
    },
    archive(payload) {
        return api.patch('like_products', payload)
    },
}