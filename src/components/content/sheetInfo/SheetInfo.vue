<template>
  <div class="sheet-info">
    <nav-bar class="sheet-info-nav" ref="topNav">
      <template v-slot:left>
        <div class="inco" @click="backClick">
          <img src="~assets/imgs/radioStation/fanhui2.png" alt="">
        </div>
      </template>
      <template v-slot:center>
        <div class="text">
          歌单®
        </div>
      </template>
    </nav-bar>
    <div class="warp-scroll" v-on:scroll="scroll">
      <div class="box" ref="box" :style="{ background: 'url(' + sheetInfoContent.coverImgUrl + ')', backgroundSize: 'cover' }">
        <div class="box-bg">
          <div class="top flex">
            <sheet-item :imgUrl="sheetInfoContent.coverImgUrl" :playCount="sheetInfoContent.playCount" :vwh="120"/>
            <div class="top-info">
              <div class="name"> {{ sheetInfoContent.name }} </div>
              <div class="user flex">
                <img :src="sheetInfoContent.avatarUrl " alt=""/>
                 <div class="user-name">{{ sheetInfoContent.inckname }} > </div>
              </div>
            </div>
          </div>
          <div class="item-bar flex">
            <div class="item">
              <img src="~assets/imgs/sheetList/pinglun.svg" alt="" class="item-img">
              <div class="item-text"> {{ sheetInfoContent.commentCount > 0 ? sheetInfoContent.commentCount : '评论' }} </div>
            </div>
            <div class="item">
              <img src="~assets/imgs/sheetList/fenxiang.svg" alt="" class="item-img">
              <div class="item-text"> {{ sheetInfoContent.shareCount > 0 ? sheetInfoContent.shareCount : '分享' }} </div>
            </div>
            <div class="item">
              <img src="~assets/imgs/sheetList/xiazai.svg" alt="" class="item-img">
              <div class="item-text"> 下载 </div>
            </div>
            <div class="item">
              <img src="~assets/imgs/sheetList/duoxuan.svg" alt="" class="item-img">
              <div class="item-text"> 多选 </div>
            </div>
          </div>
        </div>
      </div>
      <sheet-nav class="count-nav" :track-count="showMusicList ? sheetInfoContent.trackCount : 0" ref="countNav"></sheet-nav>
      <song-item v-if="showMusicList" class="song-list" :songList="songList"/>
      <div v-else class="on-song">
        <div class="song-message"> 当前暂无歌曲 </div>
      </div>
      <div class="nodata" v-if="bottomBar"> 么有了哦~  </div>
    </div>
  </div>
</template>

<script>
  import navBar from 'components/common/navbar/NavBar' //导航栏
  import SheetItem from 'components/content/sheetItem/SheetItem' //topimg
  import SheetNav from 'components/content/sheetNav/SheetNav' //信息栏
  import SongItem from 'components/content/songItem/SongItem' //歌曲列表

  import { toStringNum } from 'common/common' //转换单位
  import { getAlbum, getAlbumDetail } from 'network/album'
  import { getSongDetail } from 'network/played' //获取歌单列表
  import { getPlayDetail } from 'network/sheetInfo' //获取歌单内容 歌单评论
  
  export default {
    name: "SheetInfo",
    components: { 
      navBar,
      SheetItem,
      SheetNav,
      SongItem
    },
    data() {
      return {
        sheetId: this.$route.params.id, //获取当前路由id 查询
        sheetInfoContent: {}, //请求参数
        songList: [], //歌曲列表,
        showMusicList: false, //是否显示歌曲列表
        bottomBar: false, //是否显示底部
        countReduce: 3, //准许初次加载次数
        countReduceTwo: 3, //准许初次加载次数
      }
    },
    created() {
      this.$store.state.sheetId = this.sheetId; //保存当前歌单

      if (this.$store.state.sheetInfoData.dataHas) { //是否存在缓存数据
        let currentViewData = false;
        this.$store.state.sheetInfoData.data.forEach((item, index) => { //当前页面是否被缓存
          if(item.id === this.sheetId) { //缓存存在请求数据 请求缓存数据
            currentViewData = true;
            this.dataIndex = index; //当前页面数据下标
            this.showMusicList = this.$store.state.sheetInfoData.data[index].showMusicList; //请求缓存是否显示歌曲列表数据
            if (this.$store.state.sheetInfoData.data[index].songInfo !== undefined){  //是否缓存歌曲信息数据
              this.sheetInfoContent = this.$store.state.sheetInfoData.data[index].songInfo; //获取缓存歌曲信息数据
            }else { 
              this.getSheetInfoData(); //歌曲数据信息未被缓存 则 歌曲列表也可能缓存数据
            }
            if (this.$store.state.sheetInfoData.data[index].songList !== undefined){ //是否有缓存歌曲列表数据
              this.songList = this.$store.state.sheetInfoData.data[index].songList; //缓存歌曲列表数据
              if (!this.songList.length) {
                this.bottomBar = false;
              }else {
                this.bottomBar = true;
              }
            }else{ 
              this.bottomBar = false;
              this.getSongList();
            }
          }
        })
        if (!currentViewData) { //缓存不存在请求数据 外网请求数据
            this.getSheetInfoData();
          }
      }else { //无缓存数据 外网请求数据
        this.getSheetInfoData(); 
      }
    },
    methods: {
      /**
       * 请求页面数据
       */
      getSheetInfoData() {
        if (this.$route.params.isAlbum == 'false') {
          this.dataIndex = this.$store.state.sheetInfoData.data.length;
          this.$store.state.sheetInfoData.data[this.dataIndex] = {};
          this.$store.state.sheetInfoData.data[this.dataIndex].id = this.sheetId;
          this.getPlayDetail(); //获取歌曲信息
          this.getSongList(); //获取歌曲列表
        }else if (this.$route.params.isAlbum == "true") {
          getAlbum(this.sheetId).then(res => { //专辑信息
            this.sheetInfoContent.commentCount = res.album.info.commentCount; // 歌单评论数
            this.sheetInfoContent.coverImgUrl = res.album.picUrl; // 歌单封面
            this.sheetInfoContent.name = res.album.name; // 歌单名称
            this.sheetInfoContent.trackCount = res.album.size; // 歌单歌曲数量
            this.sheetInfoContent.nickname = res.album.artists; // 用户名
            this.sheetInfoContent.userId = res.album.id; // 用户id
            this.$store.state.createId = res.album.id;
            for (const item of res.songs) {
              // 选择性保存数据
              this.songList.push({
                mv: item.mv,
                songName: item.name,
                id: item.id,
                singer: item.ar[0].name,
                zhuanji: item.al.name,
                yuanc: item.alia,
              });
            }
          })
  
          getAlbumDetail(this.sheetId).then(res => { // 专辑数据
            this.sheetInfoContent.shareCount = res.shareCount;
          })
        }
      },
      /**
       * 请求歌曲列表 缓存歌曲列表数据
       */
      getSongList() { 
        this.songlistTimer = setInterval(() => {
          if (this.$store.state.sheetInfoData.dataHas) {
            clearInterval(this.songlistTimer);
            this.getSongDetail();
          }
        }, 1000);
      },
      getSongDetail() {
        clearTimeout(this.songDetailTimer);
        if (this.countReduce) {
          this.countReduce--;
          getSongDetail(this.sheetInfoContent.songListId.toString()).then(res => {
            if (!(typeof(res) === 'string')) { //是否有歌曲列表参数
              this.showMusicList = true;
              this.$store.state.sheetInfoData.data[this.dataIndex].showMusicList = true; //缓存是否显示歌曲列表数据
              for (const item of res.songs) {
                this.songList.push({
                  mv: item.mv,
                  songName: item.name,
                  id: item.id,
                  singer: item.ar,
                  yuanc: item.alia,
                  zhuanji: item.al.name,
                })
              }   
              this.bottomBar = true;
              this.$store.state.sheetInfoData.data[this.dataIndex].songList = this.songList; //缓存歌曲列表数据
            }else {
              this.showMusicList = false;
              this.$store.state.sheetInfoData.data[this.dataIndex].songList = []; //缓存歌曲列表数据(无数据)
              this.$store.state.sheetInfoData.data[this.dataIndex].showMusicList = false; //缓存是否显示歌曲列表数据
            }
          }).catch(() => {
            this.songDetailTimer = setTimeout(() => {
              this.getSongDetail();
            }, 3000);
          })
        }
      },
      /**
       * 请求歌曲信息 缓存歌曲信息数据
       */
      getPlayDetail() {
        clearTimeout(this.playDetailTimer);
        if (this.countReduceTwo) {
          this.countReduceTwo--;
          getPlayDetail(this.sheetId).then(res => {
            let playInfo = res.playlist;
            this.sheetInfoContent.commentCount = playInfo.commentCount; //歌单评论数
            this.sheetInfoContent.coverImgUrl = playInfo.coverImgUrl; //歌单封面
            this.sheetInfoContent.name = playInfo.name; // 歌单名称
            this.sheetInfoContent.playCount = toStringNum(playInfo.playCount) + ''; //歌单歌曲数量
            this.sheetInfoContent.trackCount = playInfo.trackCount; // 歌单歌曲数量
            this.sheetInfoContent.avatarUrl = playInfo.creator.avatarUrl; //用户头像
            this.sheetInfoContent.inckname = playInfo.creator.nickname; //用户名
            this.sheetInfoContent.userId = playInfo.creator.userId; //用户id
            this.sheetInfoContent.songListId = playInfo.trackIds.map(x => x.id); //歌单歌曲列表id
            
            this.$store.state.sheetInfoData.data[this.dataIndex].songInfo = this.sheetInfoContent; //缓存歌曲信息数据
            this.$store.state.sheetInfoData.dataHas = true; //缓存存入数据
          })
          .catch(() => {
            this.playDetailTimer = setTimeout(() => {
              this.getPlayDetail();
            }, 3000);
          })
        }
      },
      /**
       * 滑动改变 标签border-radius
       */
      scroll(e) {
        if(e.srcElement.scrollTop >= this.$refs.box.offsetHeight - this.$refs.topNav.$el.offsetHeight - this.$refs.countNav.$el.offsetHeight) {
          this.$refs.countNav.$el.style.position = 'fixed'
          this.$refs.countNav.$el.style.left = '0';
          this.$refs.countNav.$el.style.right = '0';
          this.$refs.countNav.$el.style.top = this.$refs.topNav.$el.offsetHeight + 'px';
          this.$refs.countNav.$el.style.borderTopLeftRadius = '0';
          this.$refs.countNav.$el.style.borderTopRightRadius = '0';
          this.$refs.countNav.$el.style.margin = '0';
        }else {
          this.$refs.countNav.$el.style.position = 'relative';
          this.$refs.countNav.$el.style.left = 'none';
          this.$refs.countNav.$el.style.right = 'none';
          this.$refs.countNav.$el.style.top = '0px';
          this.$refs.countNav.$el.style.borderTopLeftRadius = '20px';
          this.$refs.countNav.$el.style.borderTopRightRadius = '20px';
          this.$refs.countNav.$el.style.margin = '-50px 0';
        }
      },
      /**
       * 跳转路由
       */
      backClick() {
        this.$router.go(-1);
      }
    },
  }
</script>

<style scoped>
  .sheet-info {
    background-color: white;
    position: relative;
    z-index: 20;
    height: 100vh
  }
    .sheet-info-nav {
      background-color: black;
      color: white;
      position: fixed;
      left: 0;
      right: 0;
      z-index: 10;
    }
      .inco {
        height: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
      }
        .inco img {
          width: 20px;
          height: 20px;
          margin-left: 15px;
          z-index: 9;
        }
      .text {
        text-align: left;
      }
    .warp-scroll {
      height: calc(100vh - 56px);
      overflow: scroll;
    }
    .box {
      color: white;
    }
      .box-bg {
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.8);
        padding: 13px;
        padding-top: 60px;
        padding-bottom: 60px;
      }
        .top-info {
          padding-left: 18px;
        }
          .name {
            font-size: 18px;
            font-weight: 550;
            white-space: nowrap;
            text-overflow: ellipsis;
            word-break: break-all;
            overflow: hidden;
            width: 180px;
          }
          .user {
            margin-top: 10px;
            font-size: 16px;
          }
            .user-name {
              text-overflow: -o-ellipsis-lastline;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              line-clamp: 2;
              -webkit-box-orient: vertical;
              margin-left: 10px;
              display: flex;
              justify-content: center;
              flex-direction: column;
            }
            .user img {
              width: 40px;
              height: 40px;
              border-radius: 50%;
              vertical-align: middle;
              margin-right: 3px;
            }
    .item-bar {
      width: 94%;
      margin-left: 3%;
      margin-top: 10px;
    }
      .item {
        flex: 1;
        text-align: center;
      }
        .item img {
          width: 28px;
          height: 28px;
        }
        .item .item-text {
          font-size: 16px;
        }
    .count-nav {
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
      background-color: white;
      margin: -49px 0;
      transition: border-radius 0.3s;
      border-bottom: 1px solid rgb(238, 227, 227);
    }
    .song-list {
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
      padding-top: 50px;
      margin-top: -50px;
    }
    .on-song {
      padding-top: 100px;
      display: flex;
      justify-content: center;
      color: rgb(74, 105, 105);
    }
    .nodata {
      text-align: center;
      padding: 10px 0;
      background-color: rgb(223, 253, 253);
      font-size: 16px;
    }
</style>