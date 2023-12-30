import request from '@/utils/request'

export function deleteProduct(data) {
    return request({
        url: "https://mock.apifox.com/m1/3754258-0-default/api/product/item",
        method: "DELETE",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken")
        },
        data: data
    })
}
export function getProduct(data) {
    return request({
        url: "https://mock.apifox.com/m1/3754258-0-default/api/product/itmes",
        method: "GET",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken")
        },
        data: data
    })
}
export function addProduct(data) {
    return request({
        url: "https://mock.apifox.com/m1/3754258-0-default/api/product/item",
        method: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken")
        },
        data: data
    })
}

export function updateProduct(data) {
    return request({
        url: "https://mock.apifox.com/m1/3754258-0-default/api/product/item",
        method: "PUT",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken")
        },
        data: data
    })
}