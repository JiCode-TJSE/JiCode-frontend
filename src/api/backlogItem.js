import request from '@/utils/request'

//获取全部工作项
export function getAllBacklogItems(data) {
    console.log(data)
    return request({
        url: `http://101.37.116.97:8082/api/productdev/backlogitems`,
        method: "GET",
        params: data,
    });
}


//删除需求
export function deleteRequirement(data) {
    return request({
        url: `http://101.37.116.97:8082/api/productdev/backlogitem`,
        method: "DELETE",
        params: data,
    });
}

//获取指定工作项
export function getRelatedItemById(params) {
    return request({
        url: `http://101.37.116.97:8082/api/productdev/backlogitem`,
        method: "GET",
        params: params,
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

//关联工作项
export function addRelatedItems(data) {
    console.log("((((", data)
    return request({
        url: `http://101.37.116.97:8082/api/productdev/relation`,
        method: "POST",
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


//更新工作项
export function updateBacklogItem(data) {
    return request({
        url: `http://101.37.116.97:8082/api/productdev/backlogitem`,
        method: "GET",
        data: data,
    });
}
