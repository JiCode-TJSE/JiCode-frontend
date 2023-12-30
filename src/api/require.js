import request from '@/utils/request'

export function deleteRequire(data) {
    return request({
        url: "https://mock.apifox.com/m1/3754258-0-default/api/product/requirement",
        method: "DELETE",
        data: data
    })
}
export function getRequireInPage(data) {
    return request({
        url: "https://mock.apifox.com/m1/3754258-0-default/api/product/requirments",
        method: "GET",
        data: data
    })
}

// 新建需求
export function addRequire(data) {
    return request({
        url: "https://mock.apifox.com/m1/3754258-0-default/api/product/requirement",
        method: "POST",
        data: data
    })
}

export function getRequireDetail(data) {
    return request({
        url: "https://mock.apifox.com/m1/3754258-0-default/api/product/requirement",
        method: "GET",
        data: data
    })
}

export function updateRequire(data) {
    return request({
        url: "https://mock.apifox.com/m1/3754258-0-default/api/product/requirement",
        method: "PUT",
        data: data
    })
}