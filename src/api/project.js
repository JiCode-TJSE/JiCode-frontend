import request from '@/utils/request'

//获取全部项目
export function getAllProject(data) {
    return request({
        url: `https://mock.apifox.com/m1/3754258-0-default/Project/all`,
        method: "GET",
        data: data,
    });
}


//删除项目
export function deleteProject(data) {
    return request({
        url: `https://mock.apifox.com/m1/3754258-0-default/api/project/deleteProject`,
        method: "DELETE",
        data: data,
    });
}

//新建项目
export function addProject(data) {
    return request({
        url: `https://mock.apifox.com/m1/3754258-0-default/api/project/addProject`,
        method: "POST",
        data: data,
    });
}

//获取项目基本信息
export function getProjectInfo(data) {
    return request({
        url: `https://mock.apifox.com/m1/3754258-0-default/api/project/getProjectInfo`,
        method: "GET",
        data: data,
    });
}

//修改项目基本信息
export function updateProject(data) {
    return request({
        url: `https://mock.apifox.com/m1/3754258-0-default/api/project/updateProject`,
        method: "PUT",
        data: data,
    });
}

