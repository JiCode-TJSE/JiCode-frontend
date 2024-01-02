import request from '@/utils/request'

//分页获取全部工作项
export function getAllBacklogItems(data) {
    return request({
        url: `https://mock.apifox.com/m1/3754258-0-default/api/backlogItem/get`,
        method: "GET",
        data: data,
    });
}


//删除需求
export function deleteRequirement(data) {
    return request({
        url: `https://mock.apifox.com/m1/3754258-0-default/api/backlogItem/deleteRequirement`,
        method: "DELETE",
        data: data,
    });
}



//解除关联
export function deleteRelatedItem(data) {
    return request({
        url: `https://mock.apifox.com/m1/3754258-0-default/api/backlogItem/deleteRequirement`,
        method: "DELETE",
        data: data,
    });
}

//获取关联工作项
export function getRelatedItem(data) {
    return request({
        url: `https://mock.apifox.com/m1/3754258-0-default/api/backlogItem/deleteRequirement`,
        method: "GET",
        data: data,
    });
}