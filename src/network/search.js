import { request } from './request'

// 默认搜索关键词
export function getDefault(){
  return request({
    url: '/search/default'
  })
}

// 今日热搜榜
export function getSearchHot(){
  return request({
    url: '/search/hot'
  })
}

// 热搜榜详情
export function getHotDetail() {
  return request({
    url: '/search/hot/detail'
  })
}

// 搜索建议
export function searchSuggest(keywords, type) {
  return request({
    url: 'search/suggest',
    params: {
      keywords,
      type
    }
  })
}

// 搜索结果
export function searchSerult(keywords, limit, offset, type) {
  return request({
    url: '/search',
    params: {
      keywords,
      limit,
      offset,
      type
    }
  })
}