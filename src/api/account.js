import request from '@/utils/request'

//获取账号信息
export function getAccountInfoRequest(account_id) {
    return request({
        url: `http://121.40.53.98:8082/api/account/info?account_id=${encodeURIComponent(account_id)}`,
        method: "GET",
        data: {}
    });
}


//修改账号信息
export function updateAccountInfoRequest(params) {
    return request({
        url: `http://121.40.53.98:8082/api/account/newinfo`,
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
        url: `http://121.40.53.98:8082/api/user/userinfo?accountId=${encodeURIComponent(accountId)}`,
        method: "GET",
        data: {},
        headers: {}
    })
}

//修改用户信息
export function updateUserInfoRequest(params) {
    return request({
        url: `http://121.40.53.98:8082/api/user/userinfo`,
        method: "PUT",
        data: params,
    })
}

//注销账号
export function deleteAccountRequest(account_id) {
    return request({
        url: `http://121.40.53.98:8082/api/account?account_id=${encodeURIComponent(account_id)}`,
        method: "DELETE",
        data: {},
    })
}

//获取待办工作项
export function getJoinInfoRequest(organizationId) {
    return request({
        url: `http://121.40.53.98:8081/api/productdev/backlogitems?organizationId=${encodeURIComponent(organizationId)}`,
        method: "GET",
        data: {}
    });
}

//获取待办产品需求
export function getProductRequest(data) {
    return request({
        url: "http://121.40.53.98:8080/api/product/requirements/show",
        method: "GET",
        headers: {
            Authorization: data,
        },
    })
}


