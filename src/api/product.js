import request from '@/utils/request'
import store from '@/store'

const accountId = "1"//localStorage.getItem("accountId")
console.log(`accountId`, accountId)

export function deleteProduct(data) {
    return request({
        url: "http://121.40.53.98:8080/api/product/item",
        method: "DELETE",
        params: data
    })
}
export function getProduct(data) {
    return request({
        url: "http://121.40.53.98:8080/api/product/items",
        method: "GET",
        headers: {
            Authorization: data,
        },
    })
}
export function addProduct(data) {
    return request({
        url: "http://121.40.53.98:8080/api/product/item?id=" + accountId,
        method: "POST",
        data: data,
    })
}

export function updateProduct(data) {
    return request({
        url: "http://121.40.53.98:8080/api/product/item",
        method: "PUT",
        data: data
    })
}