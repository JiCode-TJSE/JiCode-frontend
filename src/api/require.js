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
        url: "/api/require/pageQuery/",
        method: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken")
        },
        data: data
    })
}
export function updateRequire(data) {
    return request({
        url: "/api/require/update/",
        method: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken")
        },
        data: data
    })
}