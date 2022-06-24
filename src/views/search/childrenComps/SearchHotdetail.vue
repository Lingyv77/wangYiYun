<template>
  <div class="search-hotdetail">
    <div class="top-box flex">
      <div class="left-content">
        热门搜索
      </div>
      <div class="rigth-content">
        <div class="btn">
          <img src="~assets/imgs/search/bofang.svg" alt="">
          播放全部
        </div>
      </div>
    </div>
    <div class="hot-search-content">
      <div class="item flex" 
           v-for="(item, index) in musicList" 
           :key="index" 
           :class="{hotSearch: index <= 2}">
        <div class="search-ranking">
          {{ index+1 }}
        </div>
        <div class="search-text">
          {{ item.searchWord }}
        </div>
      </div>
    </div>
    <div class="today-search-wrap">
      <div class="today-title-content flex">
        <div class="left-content">
          今日搜索
        </div>
        <div class="right-content"></div>
      </div>
      <div class="today-search-content">
        <div class="item flex" 
             v-for="(item, index) in hotList" 
             :key="index" 
             :class="{hotSearch: index <= 2}">
          <div class="search-ranking">
            {{ index+1 }}
          </div>
          <div class="search-text">
            {{ item.first }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getSearchHot, getHotDetail } from 'network/search'

  export default {
    name: "SearchHotdetail",
    data() {
      return {
        musicList: [], //歌曲
        hotList: [], //热搜
      }
    },
    mounted() {
      // 获取歌曲列表
      getHotDetail().then(res => {
        for (const item of res.data) {
          this.musicList.push({
            searchWord: item.searchWord,
            iconUrl: item.iconUrl
          })
        }
      })
      // 获取热搜列表
      getSearchHot().then(res => {
        for (const item of res.result.hots) {
          this.hotList.push({
            first: item.first
          })
        }
      })
    },
  }
</script>

<style scoped>
  .search-hotdetail {
    padding: 3px 12px; 
    position: relative;
    z-index: 7;
  }
    .top-box, .today-title-content {
      height: 40px;
      line-height: 40px;
      width: 100%;
      border-bottom: 1px solid #e6e6e6;
    }
      .left-content, .rigth-content {
        flex: 1;
        position: relative;
      }
        .left-content {
          font-weight: 600;
          font-size: 14px;
        }
        .rigth-content {
          font-size: 13px;
        }
          .rigth-content .btn {
            position: absolute;
            right: 0;
            top: 7px;
            border: 1px solid #afafaf;
            height: 20px;
            line-height: 20px;
            padding: 1px 7px;
            border-radius: 20px;
            box-sizing: content-box;
          }
            .rigth-content .btn img {
              width: 12px;
              height: 12px;
            }
    .hot-search-content {
      border-bottom: 1px solid #e6e6e6;
    }
    .hot-search-content, .today-search-content {
      display: flex;
      flex-flow: row wrap;
    }
      .item {
        width: 50%;
        height: 35px;
        line-height: 35px;
        font-size: 13px;
      }
        .search-ranking {
          margin-right: 10px;
          color: #afafaf;
        }
        .hotSearch {
          font-weight: 600;
        }
        .hotSearch .search-ranking{
          color: red;
        }
        .search-text {
          width: 100%;
        }
</style>