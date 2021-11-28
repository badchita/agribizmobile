import api from './api'

export default {
    add(params) {
        return api.post('product_rating', params)
    },
    get(id) {
        return api.get('product_rating/' + id)
    },
    update(product_rating) {
        return api.put('product_rating', product_rating)
    },
    list(params) {
        return api.get(`/product_ratings`, {
            params
        })
    },
    delete(id) {
        return api.delete('product_rating', id)
    },
    search(name) {
        return api.get('product_rating/search/' + name)
    },
    updateStatus(payload) {
        return api.patch('/product_rating/update_status', payload)
    }
}