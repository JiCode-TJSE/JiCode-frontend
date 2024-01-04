import request from '@/utils/request'

//获取全部发布
export function getAllRelease(data) {
    return request({
        url: "http://101.37.116.97:8082/api/productdev/releases",
        method: "GET",
        params: data,
    });
}

//新建发布
export function addRelease(data) {
    return request({
        url: "http://101.37.116.97:8082/api/productdev/release",
        method: "POST",
        data: data,
    });
}

//删除迭代
export function deleteRelease(id) {
    return request({
        url: `http://101.37.116.97:8082/api/productdev/release?releaseId=${encodeURIComponent(id)}`,
        method: "DELETE",
    });
}

