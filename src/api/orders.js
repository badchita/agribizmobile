import api from './api'

export default {
    add(order) {
        return api.post('order', order)
    },
    get(id) {
        return api.get('order/' + id)
    },
    update(order) {
        return api.put('order', order)
    },
    list(params) {
        return api.get(`/customer/orders/`, {
            params
        })
    },
    delete(id) {
        return api.delete('order', id)
    },
    search(name) {
        return api.get('order/search/' + name)
    },
    updateStatus(payload) {
        return api.patch('/order/update_status', payload)
    }
}