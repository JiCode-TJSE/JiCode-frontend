import request from '@/utils/request'
import store from '@/store'

const accountId = store.state.user.account_id;
console.log(`accountId`,accountId)

export function deleteProduct(data) {
    return request({
        url: "http://101.37.116.97:8080/api/product/item",
        method: "DELETE",
        params: data
    })
}
export function getProduct() {
    return request({
        url: "http://101.37.116.97:8080/api/product/items",
        method: "GET",
        headers: {
            Authorization: '2',
        },
    })
}
export function addProduct(data) {
    return request({
        url: "http://101.37.116.97:8080/api/product/item",
        method: "POST",
        data: data
    })
}

export function updateProduct(data) {
    return request({
        url: "http://101.37.116.97:8080/api/product/item",
        method: "PUT",
        data: data
    })
}