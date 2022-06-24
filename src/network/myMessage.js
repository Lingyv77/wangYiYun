import { request } from './request'

//获取用户详情
export function getUserInfo(uid) {
  return request({
    url: '/user/detail',
    params: {
      uid
    }
  })
}

//获取用户喜欢音乐
export function getListSong(uid) {
  return request({
    url: '/user/playlist',
    params: {
      uid
    }
  })
}