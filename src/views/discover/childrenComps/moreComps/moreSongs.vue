<template>
  <div class="more-songs">
    <more-bar :title="'最新音乐'"/>
    <maring-scroll class="more-titles-scroll">
      <div v-for="(item, index) in titleList" :key="index" class="item" @click="titleClick(index)" :class="{ atcive: index === currentIndex}">
        <div> {{ item.text }} </div>
      </div>
    </maring-scroll>
    <div class="box" ref="box">
      <div class="warp-video">
        <video src="~assets/video/music.mp4" ref="video"
               style="object-fit: fill"
               loop 
               autoplay>
        </video>
        <div class="video-bg">
          <div class="video-title">
            <div class="text">
              {{ titleList[currentIndex].text }}
            </div>
            <div class="englist">
              {{ titleList[currentIndex].englist }}
            </div>
          </div>
        </div>
      </div>
      <sheet-nav class="more-nav" :trackCount="counter"/>
      <song-item :songList="songList"/>
      <div class="nodata" v-if="bottomBar"> 么有了哦~  </div>
      <load-toast :order="toastOrder" :top="top"/>
    </div>
  </div>
</template>

<script>
  import MoreBar from 'components/content/sheetBar/SheetBar'
  import MaringScroll from 'components/common/marginScroll/MaringScroll'
  import SheetNav from 'components/content/sheetNav/SheetNav'
  import SongItem from 'components/content/songItem/SongItem'
  import LoadToast from 'components/content/loadToast/LoadToast'

  import { getSongsTop } from 'network/discover'

  export default {
    name: 'moreSongs',
    components: {
      MoreBar,
      MaringScroll,
      SheetNav,
      SongItem,
      LoadToast
    },
    data() {
      return {
        toastOrder: 2, 
        currentIndex: 0, //索引位
        bottomList: [false,false,false,false], //底部bar列表
        titleList: [ //标签列表 
          {
            text: '全部',
            englist: 'Recommend',
            type: 0
          },
          {
            text:'华语',
            englist: 'Mandarin Music',
            type: 7
          },
          {
            text:'欧美',
            englist:  'Western Music',
            type: 96
          },
          {
            text:'韩国',
            englist: 'Korean Music',
            type: 8
          },
          {
            text:'日本',
            englist: 'Japanese Music',
            type: 16
          }
        ],
        songList: [], //歌曲列表
        counter: 0, //歌曲数量
        top: 0
      }
    },
    activated() {
      this.$refs.video.src = require('assets/video/music.mp4');
    },
    created() {
      this.getSongsTop();
      this.$nextTick(() => {
        this.top = this.$refs.box.offsetTop + 15;
      });
    },
    methods: {
      titleClick(index) {
        this.songList = []; //清楚当前数据
        this.currentIndex = index; //切换索引位
        if (this.$store.state.moreSongsData.data[index] !== undefined) {
          this.songList = this.$store.state.moreSongsData.data[index]; //数据存在取出数据
        }else {
          this.getSongsTop();
        }
      },
      /**
       * 获取新歌数据
       */
      getSongsTop() {
        getSongsTop(this.titleList[this.currentIndex].type).then(res => {
          this.toastOrder = 1;
          setTimeout(() => {
            this.toastOrder = 0;
          }, 500);
          for (let item of res.data) {
            this.songList.push({
              id: item.id,
              songName: item.name,
              yuanc: [],
              singer: item.artists,
              zhuanji: item.album.name,
              mv: item.mvid,
            });
          }
          this.$store.state.moreSongsData.data[this.currentIndex] = this.songList; //缓存数据
          
          this.counter= res.length;
          this.bottomList[this.currentIndex] = true; //当前可现实已无数据
        }).catch(() => {
          this.toastOrder = 0;
        })
      }
    },
    computed: {
      bottomBar() {
        return this.bottomList[this.currentIndex];
      }
    }
  }
</script>

<style scoped>
  .more-songs {
    width: 100vw;
    height: calc(100vh - 56px);
    background-color: white;
    position: relative;
    z-index: 20;
  }
    .more-titles-scroll {
      height: 40px;
      border-bottom: 1px solid rgb(214, 211, 207);
    }
      .item {
        width: 20vw;
        text-align: center;
        height: 40px;
        font-size: 14px;
        line-height: 40px;
        position: relative;
      }
      .atcive {
        color: rgb(8, 128, 1);
      }
      .atcive::before {
        display: block;
        content: " ";
        width: 14vw;
        height: 2px;
        background-color: rgb(8, 128, 1);
        position: absolute;
        bottom: 1vw;
        left: 3vw;
      }
    .box {
      height: calc(100% - 44px - 40px);
      overflow: scroll;
    }
    .warp-video {
      width: 100vw;
      position: relative;
      margin-top: -2px;
    }
      .warp-video video {
        width: 100%;
        height: 160px;
      }
      .video-bg {
        position: absolute;
        width: 100%;
        height: 160px;
        background-color: rgba(0,0,0,0.6);
        left: 0;
        right: 0;
        top: 0;
      }
        .video-title {
          position: absolute;
          left: 5vw;
          bottom: 3vh;
        }
          .text {
            color: white;
            font-size: 28px;
            font-weight: 800;
          }
          .englist {
            color: rgb(184, 177, 177);
            font-size: 14px;
            font-weight: 500;
          }
    .more-nav{
      height: 40px;
    }
    .nodata {
      text-align: center;
      padding: 10px 0;
      background-color: rgb(223, 253, 253);
      font-size: 16px;
    }
</style>