import request from '@/utils/request'

export function deleteProduct(data) {
    return request({
        url: "/api/product/remove/",
        method: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken")
        },
        data: data
    })
}
export function getProduct(data) {
    return request({
        url: "/api/product/get/",
        method: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken")
        },
        data: data
    })
}
export function addProduct(data) {
    return request({
        url: "/api/product/add/",
        method: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken")
        },
        data: data
    })
}