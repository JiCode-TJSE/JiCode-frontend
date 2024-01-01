import request from '@/utils/request'

//分页获取全部工作项
export function getAllBacklogItems(data) {
    return request({
        url: `https://mock.apifox.com/m1/3754258-0-default/api/backlogItem/get`,
        method: "GET",
        data: data,
    });
}