import request from '@/utils/request'

//分页查询
export function getAllProject(account_id) {
    return request({
        url: `https://mock.apifox.com/m1/3754258-0-default/api/product/item?account_id=${encodeURIComponent(account_id)}`,
        method: "GET",
    });
}