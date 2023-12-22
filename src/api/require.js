import request from '@/utils/request'

export function deleteRequire(data) {
    return request({
        url: "/api/require/remove/",
        method: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken")
        },
        data: data
    })
}
export function getRequireInPage(data) {
    return request({
        url: "/api/require/get/",
        method: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken")
        },
        data: data
    })
}
export function addRequire(data) {
    return request({
        url: "/api/require/add/",
        method: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken")
        },
        data: data
    })
}