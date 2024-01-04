import request from '@/utils/request'

//获取账号信息
export function getAccountInfoRequest(account_id) {
    return request({
        url: `http://101.37.116.97:8081/api/account/info?account_id=${encodeURIComponent(account_id)}`,
        method: "GET",
        data: {}
    });
}


//修改账号信息
export function updateAccountInfoRequest(params) {
    return request({
        url: `http://101.37.116.97:8081/api/account/newinfo`,
        method: "PUT",
        data: params,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

//获取用户信息
export function getUserInfoRequest(accountId) {
    return request({
        url: `http://101.37.116.97:8081/api/user/userinfo?accountId=${encodeURIComponent(accountId)}`,
        method: "GET",
        data: {},
        headers: {}
    })
}

//修改用户信息
export function updateUserInfoRequest(params) {
    return request({
        url: `http://101.37.116.97:8081/api/user/userinfo`,
        method: "PUT",
        data: params,
    })
}

//注销账号
export function deleteAccountRequest(account_id) {
    return request({
        url: `http://101.37.116.97:8081/api/account?account_id=${encodeURIComponent(account_id)}`,
        method: "DELETE",
        data: {},
    })
}

//获取账号信息
export function getProjectInfoRequest(organizationId) {
    return request({
        url: `http://101.37.116.97:8082/api/productdev/backlogitems?organizationId=${encodeURIComponent(organizationId)}`,
        method: "GET",
        data: {}
    });
}


