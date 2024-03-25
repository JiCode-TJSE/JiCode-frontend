import axios from 'axios';
import { ElMessage } from 'element-plus';

const service = axios.create({
  // baseURL: 'http://localhost:8000',
  timeout: 20000 // 请求超时时间
});

service.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    const code = response.status;
    if (code < 200 || code > 300) {
      ElMessage.error({
        message: response.message // Assuming the response has a 'message' property
      });
      return Promise.reject('error');
    } else {
      return response.data;
    }
  },
  error => {
    ElMessage.error({
      message: '接口请求失败',
      duration: 5000
    });
    return Promise.reject(error);
  }
);

export default service;
