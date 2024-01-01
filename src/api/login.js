import request from '@/utils/request'

export function doRegister(data) {
    return request({
        url: "http://101.37.116.97:8081/api/account/register",
        method: "POST",
        data: data,
    })
}

export function myLogin(data) {
    return request({
        url: "http://101.37.116.97:8081/api/account/login",
        method: "POST",
        data: data,
    })
}

export function getAccountInfo(data) {
    return request({
        url: "http://101.37.116.97:8081/api/account/info",
        method: "GET",
        params: {
            account_id: data.accountId
        }
    })
}