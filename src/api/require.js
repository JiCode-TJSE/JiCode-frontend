import request from '@/utils/request'

export function deleteRequire(data) {
    return request({
        url: "http://101.37.116.97:8082/api/productdev/backlogitem",
        method: "DELETE",
        params: data
    })
}
export function getRequireInPage(data) {
    return request({
        url: "http://101.37.116.97:8082/api/productdev/backlogitem",
        method: "GET",
        params: data
    })
}


// 新建需求
export function addRequire(data) {
    console.log("!!!!!", data)
    return request({
        url: "http://101.37.116.97:8082/api/productdev/backlogitem",
        method: "POST",
        data: data
    })
}

export function getRequireDetail(data) {
    return request({
        url: "http://101.37.116.97:8082/api/productdev/backlogitem",
        method: "GET",
        params: data
    })
}

export function updateRequire(data) {
    console.log("update？？？？？", data)
    return request({
        url: "http://101.37.116.97:8082/api/productdev/requirement",
        method: "PUT",
        data: data
    })
}


// ====================================================产品需求

// 切换版本
export function switchVersion(data) {
    console.log("addVersion", data)
    return request({
        url: "http://101.37.116.97:8080/api/product/version/switch",
        method: "PUT",
        params: data
    })
}

// 新建版本
export function addVersion(data) {
    console.log("addVersion", data)
    return request({
        url: "http://101.37.116.97:8080/api/product/version",
        method: "POST",
        data: data
    })
}

export function deleteProductRequire(data) {
    return request({
        url: "http://101.37.116.97:8080/api/product/requirement",
        method: "DELETE",
        params: data
    })
}
export function getProductRequireInPage(data) {
    return request({
        url: "http://101.37.116.97:8080/api/product/requirments",
        method: "GET",
        params: data
    })
}

// 新建需求
export function addProductRequire(data) {
    console.log("!!!!!", data)
    return request({
        url: "http://101.37.116.97:8080/api/product/requirement",
        method: "POST",
        data: data
    })
}

export function getProductRequireDetail(data) {
    return request({
        url: "http://101.37.116.97:8080/api/product/requirement",
        method: "GET",
        params: data
    })
}

export function updateProductRequire(data) {
    return request({
        url: "http://101.37.116.97:8080/api/product/requirement",
        method: "PUT",
        data: data
    })
}


