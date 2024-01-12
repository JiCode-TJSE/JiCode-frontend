import request from '@/utils/request'

//获取全部工作项 ok +获取需求详情
export function getAllBacklogItems(data) {
    console.log(data)
    return request({
        url: `http://101.37.116.97:8082/api/productdev/backlogitems`,
        method: "GET",
        params: data,
    });
}


//删除需求 ok
export function deleteRequirement(data) {
    return request({
        url: `http://101.37.116.97:8082/api/productdev/backlogitem`,
        method: "DELETE",
        params: data,
    });
}

//新建需求/工作项 ok
export function addRequirement(data) {
    return request({
        url: `http://101.37.116.97:8082/api/productdev/backlogitem`,
        method: "POST",
        data: data,
    });
}

//获取关联工作项 ok  
export function getRelatedItemById(data) {
    return request({
        url: `http://101.37.116.97:8082/api/productdev/backlogitem`,
        method: "GET",
        params: data,
    });
}

//获取需求详情 ok
export function getBacklogItemInfo(data) {
    return request({
        url: `http://101.37.116.97:8082/api/productdev/backlogitem`,
        method: "GET",
        params: data,
    });
}


//解除关联 ok
export function deleteRelatedItem(data) {
    return request({
        url: `http://101.37.116.97:8082/api/productdev/associate`,
        method: "DELETE",
        params: data,
    });
}

//添加关联工作项 ok
export function addRelatedItems(data) {
    return request({
        url: `http://101.37.116.97:8082/api/productdev/relation`,
        method: "POST",
        data: data,
    });
}

//更新工作项 ok
export function updateBacklogItem(data) {
    return request({
        url: `http://101.37.116.97:8082/api/productdev/backlogitem`,
        method: "PUT",
        data: data,
    });
}

//我负责的工作项
export function getManageItems(data) {
    return request({
        url: `http://101.37.116.97:8082/api/productdev/manageditems`,
        method: "GET",
        params: data,
    });
}
