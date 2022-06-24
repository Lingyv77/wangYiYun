import { request } from './request'

// 请求轮播图
export function getBanner(type) {
  return request({
    url: '/banner',
    params: {
      type
    }
  })
}

// 热门歌单
export function getHotSheet(order, cat = "全部", limit, offset) {
  return request({
    url: '/top/playlist',
    params: {
      order,
      cat,
      limit,
      offset: Math.abs(offset)
    }
  })
}

// 新歌速递 
export function getSongsTop(type) {
  return request({
    url: '/top/song',
    params: {
      type
    }
  })
}

// 推荐节目
export function getProgram() {
  return request({
    url: '/program/recommend'
  })
}

// 最新MV
export function getNewMv(area, limit) {
  return request({
    url: '/mv/first',
    params: {
      area,
      limit
    }
  })
}

// 新碟上架
export function getNewAlbum(offset, limit, year = 2020, month = 12) {
  return request({
    url: '/top/album',
    params: {
      offset,
      limit,
      year,
      month
    }
  })
}

// 热门歌手
export function getHotSinger(limit, offset) {
  return request({
    url: '/top/artists',
    params: {
      limit,
      offset
    }
  })
}

//
export function getSheetTags() {
  return request({
    url: '/playlist/hot'
  })
}