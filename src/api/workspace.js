import axios from 'axios';

const api = axios.create({
	baseURL: 'http://101.37.116.97:8080',
	timeout: 100000,
});

export function request(url, method = 'GET', data = {}, headers = {}) {
	return api({
		url,
		method,
		data,
		headers
	}).then(response => response.data)
		.catch(error => { throw error });
}


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

//获取产品需求
export function getProductInfoRequest(token) {
    return request(`/api/product/requirements/show`, 'GET', {}, {
       Authorization: token // 假设token已经是一个有效的令牌
    });
}

//获取项目需求
export function getProjectInfoRequest(token) {
    return request(`/api/project/backlog`, 'GET', {}, {
       Authorization: `Bearer ${token}` // 假设token已经是一个有效的令牌
    });
}

export function postWorkHourRequest(params) {
    return request(`/api/project/workhours`, 'POST', params,  {
       // Authorization:  "Bearer"
    });
}

//显示工时日志
// 显示工时日志
export function getWorkHourRequest(accountId, startTime, endTime) {
    // 设置GET请求的查询参数
    const params = new URLSearchParams({
        account_id: accountId,
        start_time: startTime,
        end_time: endTime
    }).toString();

    // 设置请求头部，假设需要Bearer token认证
    const headers = {
        //Authorization: `Bearer ${token}`
    };

    // 调用统一的请求方法
    return request(`/api/project/log?${params}`, 'GET', {}, headers);
}