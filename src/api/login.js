import request from '@/utils/request'

export function doRegister(data) {
    return request({
        url: "/api/UserSystem/register/",
        method: "POST",
        data: data,
    })
}