import request from '@/utils/request'

//获取username
export function getUserName(data) {
    return request({
        url: "http://121.40.53.98:8082/api/user/multiuserInfo",
        method: "POST",
        data: data,
    });
}


//获取组织详情
export function getOrganization(data) {
    return request({
        url: `http://121.40.53.98:8081/api/organization/organizationinfo`,
        method: "GET",
        params: data,
    });
}
//获取单个用户的基本信息
export function getUserInfo(data) {
    return request({
        url: `http://121.40.53.98:8082/api/account/info`,
        method: "GET",
        params: data,
    });
}