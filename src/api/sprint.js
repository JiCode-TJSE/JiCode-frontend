import request from '@/utils/request'

//获取全部迭代 ok
export function getAllSprint(data) {
    return request({
        url: `http://121.40.53.98:8081/api/productdev/sprints`,
        method: "GET",
        params: data,
    });
}

//新建迭代 ok
export function addSprint(data) {
    return request({
        url: `http://121.40.53.98:8081/api/productdev/sprint`,
        method: "POST",
        data: data,
    });
}

//删除迭代 ok
export function deleteSprint(data) {
    return request({
        url: `http://121.40.53.98:8081/api/productdev/sprint`,
        method: "DELETE",
        params: data,
    });
}

export function getMemberINFO(data) {
    return request({
        url: `http://121.40.53.98:8081/api/user/multiuserInfo`,
        method: "POST",
        params: data,
    });
}


//获取迭代详细信息 ok
export function getSprintInfo(data) {
    return request({
        url: `http://121.40.53.98:8081/api/productdev/sprint`,
        method: "GET",
        params: data,
    });
}


//修改迭代信息
export function updateSprintInfo(data) {
    return request({
        url: `http://121.40.53.98:8081/api/productdev/sprint`,
        method: "PUT",
        data: data,
    });
}