import request from '@/utils/request'

//获取全部迭代
export function getAllSprint(data) {
    return request({
        url: `http://101.37.116.97:8082/api/productdev/sprints`,
        method: "GET",
        params: data,
    });
}

//新建迭代
export function addSprint(data) {
    return request({
        url: `http://101.37.116.97:8082/api/productdev/sprint`,
        method: "POST",
        data: data,
    });
}

//删除迭代
export function deleteSprint(id) {
    return request({
        url: `http://101.37.116.97:8082/api/productdev/sprint?sprintId=${encodeURIComponent(id)}`,
        method: "DELETE",
        data: {},
    });
}

export function getMemberINFO(data) {
    return request({
        url: `http://101.37.116.97:8081/api/user/multiuserInfo`,
        method: "POST",
        params: data,
    });
}


//获取迭代详细信息 ok
export function getSprintInfo(data) {
    return request({
        url: `http://101.37.116.97:8082/api/productdev/sprint`,
        method: "GET",
        params: data,
    });
}