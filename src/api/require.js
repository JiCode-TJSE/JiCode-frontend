import request from '@/utils/request'

export function deleteRequire(data) {
    return request({
        url: "/api/product/requirement",
        method: "DEL",
        data: data
    })
}
export function getRequireInPage(data) {
    return request({
        url: "/api/product/requirments",
        method: "GET",
        data: data
    })
}
export function updateRequire(data) {
    return request({
        url: "/api/product/requirement",
        method: "POST",
        data: data
    })
}