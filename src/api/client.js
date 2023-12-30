import request from '@/utils/request'

export function deleteClient(data) {
    return request({
        url: "https://mock.apifox.com/m1/3754258-0-default/api/product/client",
        method: "DELETE",
        data: data
    })
}
export function getClientInPage(data) {
    return request({
        url: "https://mock.apifox.com/m1/3754258-0-default/api/product/clients",
        method: "GET",
        data: data
    })
}

// 新建需求
export function addClient(data) {
    return request({
        url: "https://mock.apifox.com/m1/3754258-0-default/api/product/client",
        method: "POST",
        data: data
    })
}

export function getClientDetail(data) {
    return request({
        url: "https://mock.apifox.com/m1/3754258-0-default/api/product/client",
        method: "GET",
        data: data
    })
}

export function updateClient(data) {
    return request({
        url: "https://mock.apifox.com/m1/3754258-0-default/api/product/client",
        method: "PUT",
        data: data
    })
}