import { request } from './request'

export function getBanner() { //轮播图信息
  return request({
    url: '/dj/banner'
  })
}

// 今日优选
export function getPerfered() {
  return request({
    url: '/dj/today/perfered'
  })
}

// 付费精品
export function getPayBoutique(limit) {
  return request({
    url: '/dj/toplist/pay',
    params: {
      limit
    }
  })
}

// 电台分类
export function getClassify() {
  return request({
    url: '/dj/catelist'
  })
}

// 电台分类推荐
export function getClassifyRecommend(type) {
  return request({
    url: '/dj/recommend/type',
    params: {
      type
    }
  })
}

// 热门电台
export function getHotStation(cateId, limit, offset) {
  return request({
    url: '/dj/radio/hot',
    params: {
      cateId,
      limit,
      offset
    }
  })
}

//付费精选
export function getPaySfit(limit, offset) {
  return request({
    url: '/dj/paygift',
    params: {
      limit,
      offset
    }
  })
}

//主播每日榜
export function getAnchorRanking(limit) {
  return request({
    url: '/dj/toplist/hours',
    params: {
      limit
    }
  })
}

//主播新人榜
export function getAnchorNewMen(limit) {
  return request({
    url: '/dj/toplist/newcomer',
    params: {
      limit
    }
  })
}

//主播热门榜
export function getAnchorHot(limit) {
  return request({
    url: '/dj/toplist/popular',
    params: {
      limit
    }
  })
}

//声音每日榜
export function getSongEveryDay(limit) {
  return request({
    url: '/dj/program/toplist/hours',
    params: {
      limit
    }
  })
}

//声音热门榜
export function getSongHot(limit) {
  return request({
    url: '/dj/program/toplist',
    params: {
      limit
    }
  })
}