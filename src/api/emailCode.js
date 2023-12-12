import request from '@/utils/request'

//根据email获取验证码
export function sendEmailCode(data) {
  return request({
    url: '/api/sendEmailCode/',
    method: 'post',
    data: data,
  })
}

//  for testing
// import axios from 'axios';
// import MockAdapter from 'axios-mock-adapter';

// // 创建一个模拟的 axios 实例
// const mock = new MockAdapter(axios);

// // 模拟发送邮件验证码的接口
// mock.onPost('/api/sendEmailCode/').reply(200, {
//   msg: '验证码发送成功',
//   verificationCode: '123456' // 模拟的验证码数据
// });

// // 导出模拟的 sendEmailCode 函数
// export function sendEmailCode(data) {
//   return axios.post('/api/sendEmailCode/', data);
// }



