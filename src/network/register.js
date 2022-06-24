import { request } from './request'

//检测账号是否注册
export function getDetectionSate(phone) {
  return request({
    url: '/cellphone/existence/check',
    params: {
      phone
    }
  })
}

//登录接口
export function userRegister(phone, password) {
  return request({
    url: '/login/cellphone',
    params: {
      phone,
      password
    }
  })
}

//刷新登录状态
export function againRes() {
  return request({
    url: '/login/refresh'
  })
}

//登录状态
export function loginStatus() {
  return request({
    url: '/login/status',
  })
}

//退出登录状态
export function logout() {
  return request({
    url: '/logout',
  })
}

//修改用户信息
export function setUserInfo({gender, birthday, nickname, province, city, signature}) {
  return request({
    url: '/user/update',
    params: {
      gender, //性别 0: 保密 1: 男性 2: 女性
      birthday, //出生日期, 时间戳
      nickname, //用户昵称      
      province, //省份id
      city, //城市id
      signature, //用户签名
    }
  })
}

//获取验证码
export function getCodeValue(phone) {
  return request({
    url: '/captcha/sent',
    params: {
      phone
    }
  })
}

//修改密码
export function changePassword({ captcha, phone,  password,  nickname, }) {
  return request({
    url: '/register/cellphone',
    params: {
      captcha, // 验证码
      phone, // 手机号码
      password, // 密码
      nickname, // 昵称
    }
  })
}