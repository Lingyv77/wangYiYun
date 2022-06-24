<template>
  <div id="discover">
    <div class="scroll">
      <discover-swiper/>
        <maring-scroll class="functional-content">
          <div v-for="(item, index) in recommend" 
               :key="index" 
               class="item"
               @click="toView(item.path)">
            <div class="inco-bg">
            <div class="list">
              <img :src="item.imgUrl" alt="">
            </div>
            </div>
            <span>{{item.title}}</span>
          </div>
        </maring-scroll> 
      <discover-sheet/>
      <discover-song-top/>
      <discover-program/>
      <discover-mv/>
      <discover-album/>
      <discover-hot-singer/>
    </div>
  </div>
</template>

<script>
  import DiscoverSwiper from './childrenComps/DiscoverSwiper'
  import DiscoverSheet from './childrenComps/DiscoverSheet'
  import MaringScroll from 'components/common/marginScroll/MaringScroll'
  import DiscoverSongTop from './childrenComps/DiscoverSongTop'
  import DiscoverProgram from './childrenComps/DiscoverProgram'
  import DiscoverMv from './childrenComps/DiscoverMv'
  import DiscoverAlbum from './childrenComps/DiscoverAlbum'
  import DiscoverHotSinger from './childrenComps/DiscoverHotSinger'

  export default {
    name: 'Discover',
    data() {
      return {
        recommend: [
        {
          title:'每日推荐',
          imgUrl: require('assets/imgs/discover/rili.svg'),
          path: '/discover'
        }, 
        {
          title:'私人FM',
          imgUrl: require('assets/imgs/discover/FM.svg'),
          path: '/discover'
        }, 
        {
          title:'歌单',
          imgUrl: require('assets/imgs/discover/gedan.svg'),
          path: '/discover'
        }, 
        {
          title:'排行榜',
          imgUrl: require('assets/imgs/discover/paihang.svg'),
          path: '/myMessage/radioStation/stationHomeP/stationRanking' 
        }, 
        {
          title:'直播',
          imgUrl: require('assets/imgs/discover/zhibo.svg'),
          path: '/discover'
        }, 
        {
          title:'数学专辑',
          imgUrl: require('assets/imgs/discover/zhuanji.svg'),
          path: '/discover'
        }, 
        {
          title:'歌聊',
          imgUrl: require('assets/imgs/discover/liaotian.svg'),
          path: '/discover'
        }, 
        {
          title:'游戏专区',
          imgUrl: require('assets/imgs/discover/youxi.svg'),
          path: '/discover'
        }
        ]
      }
    },
    components: {
      DiscoverSwiper,
      DiscoverSheet,
      MaringScroll,
      DiscoverSongTop,
      DiscoverProgram,
      DiscoverMv,
      DiscoverAlbum,
      DiscoverHotSinger
    },
    methods: {
      toView(path) {
        this.$router.push(path);
      }
    },
  }
</script>

<style scoped>
  #discover {
    position: relative;
    height: calc(100vh - 44px - 65px);
    width: 100vw;
    overflow: scroll;
    top: 44px;
    padding-top: 10px;
    box-sizing: content-box;
  }
    .functional-content {
      margin: 10px 0;
      height: 70px;
    }
      .item {
        width: 20vw;
        height: 70px;
        text-align: center;
        font-size: 12px;
      }
        .inco-bg {
          display: flex;
          justify-content: center;
        }
        .item span{
          line-height: 30px;
        }
          .list {
            width: 48px;
            height: 48px;
            background: linear-gradient(to right, #d84e4e, red);
            border-radius: 50%;
            text-align: center;
          }
            .list img {
              margin-top: 9px;
              width: 26px;
              height: 26px;
            }
</style>