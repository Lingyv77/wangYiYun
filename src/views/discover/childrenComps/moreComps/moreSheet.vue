<template>
  <div class="more-sheet">
    <more-bar :title="'歌曲广场'" class="more-sheet-nav"/>
    <maring-scroll class="more-titles-scroll">
      <div v-for="(item, index) in titleList" :key="index" class="item" @click="titleClick(index)" :class="{ atcive: index === currentIndex}">
        <div> {{item}} </div>
      </div>
    </maring-scroll>
    <load-toast :order="toastOrder" :top="toastTop"/>
    <toast :text="'加载失败'" :order="toastFail"/>
    <div class="more-scroll" @scroll="moreScroll"  @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd" ref="moreScroll">
      <div class="more-scroll-wrap">
        <div v-for="item in currentSongList" :key="item.length" class="song-sheet-item" @click="toSheet(item.id)">
          <sheet-item :img-url="item.picUrl" :play-count="item.playCount"/>
          <div class="song-name">{{ item.name }}</div>
        </div>
        <div class="not-data" v-if="getShowNotData">
          没有了哦~
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MaringScroll from 'components/common/marginScroll/MaringScroll'
  import MoreBar from 'components/content/sheetBar/SheetBar'
  import LoadToast from 'components/content/loadToast/LoadToast'
  import Toast from 'components/content/toast/Toast'

  import { getSheetTags, getHotSheet } from 'network/discover'

  import { toStringNum } from 'common/common'
  import SheetItem from 'components/content/sheetItem/SheetItem.vue'
  
  export default {
    name: 'moreSheet',
    components: { 
      MaringScroll,
      MoreBar,
      SheetItem,
      LoadToast,
      Toast,
    },
    data() {
      return {
        titleList: [], //标签栏列表
        songList: [[]], //歌曲列表数据
        scrollInfo: [  //是否可滑动置底加载数据
          {
            can:false,  //定位
            postion: 0, //是否可执行滑动
            showNotData: false //加载是否无数据
          }
        ],
        currentIndex: 0, //当前索引
        count: 30 ,//取量
        distanceValue: 100, //移动多少值 置底加载数据
        toastOrder: 3, //加载吐司指令
        toastTop: 0, //吐司top落位
        toastFail: false,
        getShowNotData :false //加载是否无数据
      }
    },
    activated() {
      if (this.$store.state.moreSheetData.dataHas) {
        this.$refs.moreScroll.scrollTop = this.scrollInfo[this.currentIndex].postion; //postion定位
      }else {
        /**
         * 获取标签信息
         */
        getSheetTags().then(res => {
          this.titleList[0] = '全部';
          for (let item of res.tags) {
            this.titleList.push(item.name)
            this.songList.push([]);
            this.scrollInfo.push({can:false, postion: 0, showNotData: false});
          }
        })
        /**
         * 获取歌单
         */
        getHotSheet("hot", "全部", this.count, 0 * 30).then(res => {
          for (let item of res.playlists) {
            this.songList[this.currentIndex].push({
              id: item.id, // 歌单id
              name: item.name, // 歌单名称
              picUrl: item.coverImgUrl, // 封面
              playCount: toStringNum(item.playCount), // 播放量
            });
          }

          this.$store.state.moreSheetData.data[this.currentIndex] = {};
          this.$store.state.moreSheetData.data[this.currentIndex].offset = 0; //缓存数据页数位置
          this.$store.state.moreSheetData.data[this.currentIndex].data = this.songList[this.currentIndex]; //缓存数据
          this.$store.state.moreSheetData.dataHas = true; //成功缓存数据

          this.scrollInfo[this.currentIndex].can = true; //可执行置底加载数据
          this.toastTop = this.$refs.moreScroll.offsetTop + 15;
        })
      }
    },
    methods: {
      /**
       * 索引改变 给各个类型的数据初始化
       */
      titleClick(index) {
        this.currentIndex = index; //改变索引值
        this.getShowNotData = this.scrollInfo[this.currentIndex].showNotData; //获取当前索引界面是否无数据
        if (this.$store.state.moreSheetData.data[this.currentIndex] !== undefined) { //是否有缓存数据存在
          this.songList[this.currentIndex] = this.$store.state.moreSheetData.data[this.currentIndex].data;
        }else {
          getHotSheet("hot", this.titleList[this.currentIndex], this.count, 0 * 30).then(res => {
            for (let item of res.playlists) {
              this.songList[this.currentIndex].push({
                id: item.id, // 歌单id
                name: item.name, // 歌单名称
                picUrl: item.coverImgUrl, // 封面
                playCount: toStringNum(item.playCount) + '', // 播放量
              });
            }
  
            this.$store.state.moreSheetData.data[this.currentIndex] = {};
            this.$store.state.moreSheetData.data[this.currentIndex].offset = 0; //缓存数据页数位置
            this.$store.state.moreSheetData.data[this.currentIndex].data = this.songList[this.currentIndex]; //缓存数据

            this.scrollInfo[this.currentIndex].can = true; //可执行置底加载数据
          })
        }
        let positionLoad = setInterval(() => {
          if (this.$refs.moreScroll.scrollHeight >= this.scrollInfo[this.currentIndex].postion) { //等到元素的到达定位高度
            clearInterval(positionLoad);
            this.$refs.moreScroll.scrollTop = this.scrollInfo[this.currentIndex].postion; //postion定位
          }
        }, 20);
      },
      /**
       * 跳转歌曲信息页
       */
      toSheet(id) {
        this.$router.push(`/playDetail/${id}&false`);
      },
      /**
       * moreScroll滑动 判断加载数据
       */
      moreScroll(e) {
        this.scrollInfo[this.currentIndex].postion = e.srcElement.scrollTop; //保存当前定位
      },
      touchStart(e) {
        if ((this.$refs.moreScroll.scrollTop +this.$refs.moreScroll.offsetHeight) >= this.$refs.moreScroll.scrollHeight - 3) {
          this.startPosition = e.touches[0].pageY;
          this.emit = true;
        }else {
          this.emit = false;
        }
      },
      touchMove(e) {
        if (this.startPosition) {
          this.distance = this.startPosition - e.touches[0].pageY;
        }else {
          this.distance = 0;
        }
      },
      touchEnd() {
        if (this.emit && this.distance > this.distanceValue) {
          this.loadData();
        }
      },
      /**
       * 置底加载数据
       */
      loadData() {
        if (this.scrollInfo[this.currentIndex].can) {
          this.scrollInfo[this.currentIndex].can = false; //设置不可置底加载
          let addData = false; //数据载入
          this.toastOrder = 1;
          getHotSheet("hot", this.titleList[this.currentIndex], 30, (this.$store.state.moreSheetData.data[this.currentIndex].offset+1) * 30).then(res => {
            setTimeout(() => {
              this.toastOrder = 0;
              addData = true;
            }, 500);
            if (res.more) { //是否存有数据
              let addTimer = setInterval(() => { //200ms 计算一次是否加载成功
                this.scrollInfo[this.currentIndex].can = true; //加载成功可再次加载
                if (addData) {
                  clearInterval(addTimer);
                  for (let item of res.playlists) {
                    this.songList[this.currentIndex].push({ //添加数据
                      id: item.id, // 歌单id
                      name: item.name, // 歌单名称
                      picUrl: item.coverImgUrl, // 封面
                      playCount: toStringNum(item.playCount) + '', // 播放量
                    });
                  }
                }
              }, 200)
              this.$store.state.moreSheetData.data[this.currentIndex].offset += 1; //缓存数据页数位置
              this.$store.state.moreSheetData.data[this.currentIndex].data = this.songList[this.currentIndex]; //缓存数据
            }else {
              this.getShowNotData = true; //当前索引位无数据 
              this.scrollInfo[this.currentIndex].showNotData = true; //保存 当前索引位无数据 
              this.scrollInfo[this.currentIndex].can = false; //设置不可置底加载
            }
          }).catch(() => {
              this.scrollInfo[this.currentIndex].can = true; //加载成功可再次加载
              this.toastOrder = 0; 
              this.toastFail = !this.toastFail; //吐司加载失败
          })
        }
      }
    },
    computed: {
      /**
       * 当前索引对应数据
       */
      currentSongList() {
        return this.songList[this.currentIndex];
      }
    }
  }
</script>

<style scoped>
  .more-sheet {
    height: 100vh;
    background-color: white;
    position: relative;
    z-index: 10;
  }
    .more-sheet-nav {
      border-bottom: 1px solid rgb(194, 194, 182);
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
    .more-scroll {
      background-color: white;
      height: calc(100vh - 44px - 40px - 56px);
      width: 100vw;
      overflow: scroll;
    }
      .more-scroll-wrap {
        display: flex;
        flex-wrap: wrap;
      }
      .song-sheet-item {
        width: 33.333vw;
        overflow: hidden;
        margin-top: 10px;
      }
        .song-name {
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
          font-size: 14px;
          text-align: center;
        }
      .not-data {
        height: 30px;
        width: 100vw;
        text-align: center;
        line-height: 30px;
        color: rgb(70, 75, 79);
        margin-top: 8px;
        background-color: aliceblue;
        box-sizing: content-box;
        border-top: 1px solid rgb(206, 212, 218);
      }
</style> 