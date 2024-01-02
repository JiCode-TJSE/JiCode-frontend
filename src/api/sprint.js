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

