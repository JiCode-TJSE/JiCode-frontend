import request from '@/utils/request'

export function deleteClient(data) {
    return request({
        url: "http://121.40.53.98:8080/api/product/client",
        method: "DELETE",
        params: data
    })
}
export function getClientInPage(data) {
    return request({
        url: "http://121.40.53.98:8080/api/product/clients",
        method: "GET",
        params: data
    })
}

// 新建需求
export function addClient(data) {
    return request({
        url: "http://121.40.53.98:8080/api/product/client",
        method: "POST",
        data: data
    })
}

export function getClientDetail(data) {
    return request({
        url: "http://121.40.53.98:8080/api/product/client",
        method: "GET",
        params: data
    })
}

export function updateClient(data) {
    return request({
        url: "http://121.40.53.98:8080/api/product/client",
        method: "PUT",
        data: data
    })
}

export function getClientSearch(data) {
    return request({
        url: "http://121.40.53.98:8080/api/product/clients/search",
        method: "GET",
        params: data
    })
}