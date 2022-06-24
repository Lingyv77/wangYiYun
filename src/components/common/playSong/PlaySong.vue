<template>
  <div class="play-song">
      <div class="play-song-warp" :style="{ background: 'url(' + data.picUrl + ')', backgroundSize: 'cover' }">
      <div class="bg">
        <play-nav :title="data.songName"/>
        <div class="info-logo">
          <div class="tranfrom-view flex" ref="box">
            <div class="logo" @click="logoClick">
              <div class="logo-box">
                <div class="logo-wrap" ref="logoWarp">
                  <img src="~assets/imgs/playSong/gp3.png" alt="" class="border-img">
                  <img :src="data.picUrl" alt="" class="logo-img"/>
                </div>
              </div>
            </div>
            <div class="lyirc-conten" @click="lyircClick">
              <slot name="conten"></slot>
            </div>
          </div>
        </div>
        <div class="nav flex">
          <div class="inco-nav">
            <img src="~assets/imgs/playSong/xinaixin.svg" alt="">
          </div>
          <div class="inco-nav">
            <img src="~assets/imgs/playSong/xiazai.svg" alt="">
          </div>
          <div class="inco-nav">
            <img src="~assets/imgs/playSong/changge.svg" alt="">
          </div>
          <div class="inco-nav">
            <img src="~assets/imgs/playSong/pinglun.svg" alt="">
          </div>
          <div class="inco-nav" @click="lyircConfigClick">
            <img src="~assets/imgs/playSong/gengduo.svg" alt="">
          </div>
          <lyirc-config v-show="showLyircConfig"/>
        </div>
        <div class="time-info flex">
          <div class="current-time">  {{ currentTime }}  </div>
          <div class="box-progress">
          <progress-bar class="progress-bar" :bg="'#c99e9e'" :small="'#9f7474'"/>
          </div>
          <div class="duration-time"> {{ durationTime }} </div>
        </div>
        <play-song-bar/>
      </div>
    </div>
  </div>
</template>

<script>
  import PlayNav from './childrenComps/PlayNav' //导航
  import ProgressBar from 'components/content/progressBar/ProgressBar' //滑动条
  import PlaySongBar from './childrenComps/PlaySongBar'
  import { playSong } from 'network/playSong' //获取音乐url

  import LyircConfig from './childrenComps/LyircConfig' //歌词配置
  
  export default {
    name: "PlaySong",
    components: { 
      PlayNav,
      ProgressBar,
      PlaySongBar,
      LyircConfig
    },
    props: {
      data: {
        type: Object,
        defalut: () => {}
      },
    },
    data() {
      return {
        rightImg: require('assets/imgs/playSong/fenxiang.svg'),
        showlogo: true,
        currentTime: '00:00', //当前时间
        durationTime: '00:00', //总时间
        transformRotate: this.$store.state.playSong.transformRotate, //转度
        showLyircConfig: false, //是否显示歌词配置项
        countReduceTwo: 3, //准许初次加载次数
      }
    },
    computed: {
      playImg: {
        get(){
          return this.$store.state.playSong.playNow;
        },
        set(value){
          this.$store.state.playSong.playNow = value;
        }
      }
    },
    created() {
      this.getCurrentTiem(); //歌曲播放时间初次赋值
      this.MusicImgTransformStart(); //动画
      this.$nextTick().then(() => {
        this.getPlaySong();
      })
    },
    unmounted() {
      this.MusicImgTransformStop();
      this.StopCurrentTiem();
    },
    methods: {
      /**
       * 歌曲总时间
       */
      getDuration() {
        let timeD =  setInterval(() => {
          if (!isNaN(this.$store.state.navMusicDom.duration)) {
            this.durationTime = this.transitionTime(this.$store.state.navMusicDom.duration);
            clearInterval(timeD);
          }
        }, 20);
      },
       /**
       * 获取歌曲数据
       */
      getPlaySong() {
        if (this.$store.state.playSong.id+'' !== this.$route.params.id+'') { //不是播放当前音乐的页面 重新加载music
          this.$store.state.playSong.currentPercent = 0; //进度归零
          this.$store.state.playSong.playNow = false; //停止上一个music
          this.StopCurrentTiem(); //停止监听当前时间
          this.currentTime = this.transitionTime(0); //初始化当前时间
          this.$store.state.navMusicDom.pause();
          this.firstPlaySong();
        }else {
          this.$store.state.playSong.playNow = true; 
          this.getDuration(); //歌曲总时间初次赋值
        }

        this.$store.state.playSong.id = this.$route.params.id;
      },
      /**
       * 请求歌曲数据
       */
      firstPlaySong() {
        clearTimeout(this.playSongTimer);
        if (this.countReduceTwo) {
          this.countReduceTwo--;
          playSong(this.data.id).then(res => {
            this.$bus.$emit('songChange');
            this.$store.state.navMusicDom.src = res.data[0].url; //更新歌曲url
            this.getCurrentTiem();
            this.$store.state.playSong.playNow = true;
            this.$store.state.navMusicDom.play();
            this.getDuration(); //歌曲总时间初次赋值
          }).catch(() => {
            this.playSongTimer = setTimeout(() => {
              this.firstPlaySong();
            }, 2000);
          })
        }
      },
      logoClick() {
        this.showlogo = false;
        this.$refs.box.style.transform = 'translateX(-50%)';
      },
      lyircClick() {
        this.showlogo = true;
        this.$refs.box.style.transform = 'translateX(0)';
      },
      /**
       * 时间转换
       */
      transitionTime(num) { 
        let vlaue = num.toFixed(0);
        let numVlaue = Math.trunc(vlaue / 60); //整除整数
        let surplusNum = (vlaue % 60).toFixed(0); //整除余数
        numVlaue = numVlaue > 9 ? numVlaue : '0'+numVlaue;
        surplusNum = surplusNum > 9 ? surplusNum : '0'+surplusNum;
        return numVlaue +':'+ surplusNum; //转换接果数
      },
      /**
       * 歌曲播放时间监听
       */
      getCurrentTiem() { 
        clearInterval(this.Timer);
        let currentTime = this.transitionTime(this.$store.state.navMusicDom.currentTime); //获取初始时长
        this.currentTime = currentTime;
        this.Timer = setInterval(() => {
          this.currentTime = this.transitionTime(this.$store.state.navMusicDom.currentTime); //获取时长 
        }, 1000);
      },
      /**
       * 停止歌曲时间监听
       */
      StopCurrentTiem() {
        clearInterval(this.Timer);
      },
      /**
       * 开始logWarp计时
       */
      MusicImgTransformStart() {
        clearInterval(this.logoWarp);
        this.logoWarp = setInterval(() => {
          this.transformRotate += 1;
          this.$store.state.playSong.transformRotate += 1;
          this.$refs.logoWarp.style.transform = `rotate(${this.transformRotate}deg)`;
          this.$store.state.playSong .currentPercent = ((this.$store.state.navMusicDom.currentTime / this.$store.state.navMusicDom.duration).toFixed(4) * 100 ); //更改进度百分比
          if (this.$store.state.navMusicDom.currentTime.toFixed(2) == this.$store.state.navMusicDom.duration.toFixed(2)) {
            clearInterval(this.logoWarp);
          }
        }, 50)
      },
      /**
       * 停止logWarp计时
       */
      MusicImgTransformStop() {
        clearInterval(this.logoWarp);
      },
      /**
       * 歌词配置点击
       */
      lyircConfigClick() {
        this.showLyircConfig = !this.showLyircConfig;
      },
    },
    watch: {
      playImg() {
        if (this.playImg) {
          this.MusicImgTransformStart();
          this.getCurrentTiem();
        }else {
          this.MusicImgTransformStop();
          this.StopCurrentTiem();
        }
      },
    }
  }
</script>

<style scoped>
  .play-song {
    position: relative;
    z-index: 23;
    background: rgb(128, 128, 125);
    height: 100vh;
  }
  .play-song-warp {
    height: 100%;
    width: 100%;
    position: relative;
  }
    .bg {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background-color: rgba(0,0,0,0.7);
    }
    .info-logo {
      width: 100%;
      height: calc(80% - 44px);
      overflow: hidden;
    }
      .tranfrom-view {
        width: 200%;
        height: 100%;
        transition: all 0.7s;
      }
        .logo {
          width: 50%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
          .logo-box {
            height: 300px;
            display: flex;
            justify-content: center;
          }
            .logo-wrap {
              width: 300px;
              height: 300px;
              position: relative;
            }
              .border-img {
                width: 100%;
                height: 100%;
              }
              .logo-img {
                width: 140px;
                height: 140px;
                border-radius: 50%;
                position: absolute;
                left: calc(50% - 67px);
                top: calc(50% - 75px);
              }
        .lyirc-conten {
          width: 50%;
          height: 100%;
        }
      .nav {
        padding: 0 10px;
        padding-top: 10px;
        height: 35px;
        position: relative;
      }
        .inco-nav {
          flex: 1;
        }
          .inco-nav img {
            width: 100%;
            height: 100%;
          }
      .time-info {
        color: white;
        margin-top: 8px;
      }
        .progress-bar {
          width: 76vw;
        }
        .duration-time, .current-time {
          width: 12vw;
          font-size: 12px;
          text-align: center;
        }
        .box-progress {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
</style>