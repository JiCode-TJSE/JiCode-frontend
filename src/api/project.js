import request from '@/utils/request'

//获取全部项目
export function getAllProject(data) {
    return request({
        url: `https://mock.apifox.com/m1/3754258-0-default/api/allproject`,
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