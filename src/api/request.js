import { request } from './api.js';
//获取账号信息
export function getAccountInfoRequest(account_id) {
    return request(`/api/account/info?account_id=${encodeURIComponent(account_id)}`, 'GET', {},  {
       // Authorization: account_id
    });
}

//修改账号信息
export function updateAccountInfoRequest(params) {
    return request(`/api/account/newinfo`, 'PUT', params,  {
        'Content-Type': 'application/json'
    });
}

//获取用户信息
export function getUserInfoRequest(accountId) {
    return request(`/api/user/userinfo?accountId=${encodeURIComponent(accountId)}`, 'GET', {},  {
       //Authorization:  "Bearer"
    });
}

//修改用户信息
export function updateUserInfoRequest(params) {
    return request(`/api/user/userinfo`, 'PUT', params,  {
       // Authorization:  "Bearer"
    });
}

//获取用户信息
export function deleteAccountRequest(account_id) {
    return request(`/api/account?account_id=${encodeURIComponent(account_id)}`, 'DELETE', {},  {
       //Authorization:  "Bearer"
    });
}
