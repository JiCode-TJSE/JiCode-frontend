import request from '@/utils/request'

export function deleteRequire(data) {
    return request({
        url: "http://101.37.116.97:8080/api/product/requirement",
        method: "DELETE",
        params: data
    })
}
export function getRequireInPage(data) {
    return request({
        url: "http://101.37.116.97:8080/api/product/requirments",
        method: "GET",
        params: data
    })
}

// 新建需求
export function addRequire(data) {
    return request({
        url: "http://101.37.116.97:8080/api/product/requirement",
        method: "POST",
        data: data
    })
}

export function getRequireDetail(data) {
    return request({
        url: "http://101.37.116.97:8080/api/product/requirement",
        method: "GET",
        params: data
    })
}

export function updateRequire(data) {
    return request({
        url: "http://101.37.116.97:8080/api/product/requirement",
        method: "PUT",
        data: data
    })
}