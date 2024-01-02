import request from '@/utils/request'

//获取全部项目
export function getAllProject(data) {
    return request({
        url: `http://101.37.116.97:8082/api/productdev/projects`,
        method: "GET",
        params: data,
    });
}


//删除项目
export function deleteProject(data) {
    return request({
        url: `http://101.37.116.97:8082/api/productdev/project`,
        method: "DELETE",
        data: data,
    });
}

//新建项目
export function addProject(data) {
    return request({
        url: `http://101.37.116.97:8082/api/project/addProject`,
        method: "POST",
        data: data,
    });
}

//获取项目基本信息
export function getProjectInfo(data) {
    return request({
        url: `http://101.37.116.97:8082/api/projectdev/project`,
        method: "GET",
        params: data,
    });
}

//修改项目基本信息
export function updateProject(data) {
    return request({
        url: `
        http://101.37.116.97:8082/api/productdev/project`,
        method: "PUT",
        data: data,
    });
}

