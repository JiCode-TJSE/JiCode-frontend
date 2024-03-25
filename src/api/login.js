import request from '@/utils/request'

export function doRegister(data) {
    return request({
        url: "http://121.40.53.98:8082/api/account/register",
        method: "POST",
        data: data,
    })
}

export function myLogin(data) {
    return request({
        url: "http://121.40.53.98:8082/api/account/login",
        method: "POST",
        data: data,
    })
}

export function getAccountInfo(data) {
    return request({
        url: "http://121.40.53.98:8082/api/account/info",
        method: "GET",
        params: {
            account_id: data.accountId
        }
    })
}