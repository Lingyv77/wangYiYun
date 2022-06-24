import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000,
    // crossDomain: true,//设置cross跨域
    withCredentials: true//设置cross跨域 并设置访问权限 允许跨域携带cookie信息
  })

  //拦截截取数据
  instance.interceptors.response.use(res => {
    return res.data;
  }, err => {
    return Promise.reject(err);
  })

  return instance(config)
}