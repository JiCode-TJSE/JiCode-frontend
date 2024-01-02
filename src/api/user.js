import request from '@/utils/request'

//获取username
export function getUserName(data) {
    return request({
        url: `https://mock.apifox.com/m1/3754258-0-default/api/user/multiuserInfo`,
        method: "GET",
        data: data,
    });
}


//获取组织详情
export function getOrganization(data) {
    return request({
        url: `https://mock.apifox.com/m1/3754258-0-default/api/user/multiuserInfo`,
        method: "GET",
        data: data,
    });
}

