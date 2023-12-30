import request from '@/utils/request'

export function doRegister(data) {
    return request({
        url: "https://mock.apifox.com/m1/3754258-0-default/api/account/register",
        method: "POST",
        data: data,
    })
}