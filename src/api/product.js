import request from '@/utils/request'

export function deleteProduct(data) {
    return request({
        url: "https://mock.apifox.com/m1/3754258-0-default/api/product/item",
        method: "DELETE",
        data: data
    })
}
export function getProduct(data) {
    return request({
        url: "https://mock.apifox.com/m1/3754258-0-default/api/product/itmes",
        method: "GET",
        data: data
    })
}
export function addProduct(data) {
    return request({
        url: "https://mock.apifox.com/m1/3754258-0-default/api/product/item",
        method: "POST",
        data: data
    })
}

export function updateProduct(data) {
    return request({
        url: "https://mock.apifox.com/m1/3754258-0-default/api/product/item",
        method: "PUT",
        data: data
    })
}