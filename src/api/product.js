import api from './api'

export default {
    add(product) {
        return api.post('product', product)
    },
    get(id) {
        return api.get('product/' + id)
    },
    update(product) {
        return api.put('product', product)
    },
    list(params) {
        return api.get(`/customer/products`, {
            params
        })
    },
    archive(product) {
        return api.patch('product', product)
    },
    delete(id) {
        return api.delete('product', id)
    },
    searchCustomerall(name) {
        return api.get('product/searchcustomerall/' + name)
    }
}