<template>
  <div class="play-nav">
    <div class="play-content">
      <audio ref="navMusic" :src="musicUrl"></audio>
      <div class="music-img">
        <div class="imgbg" ref="musicImg">
          <img :src="$store.state.playSong.picUrl || img" alt="">
        </div>
      </div>
      <div class="text" @click="PlaysongView">
        <div class="name">
          {{ $store.state.playSong.songName === "" ? "海边的梦" : $store.state.playSong.songName }}
        </div>
        <div class="music-name">
           {{ $store.state.playSong.singer === "" ? "ChenYueLong." : $store.state.playSong.singer }}
        </div>
      </div>
        <div class="play-muisc">
          <div class="music-img" @click="playClick">
            <img v-if="playImg" src="~assets/imgs/common/zanting.svg"  alt=""/>
            <img v-else src="~assets/imgs/common/shipin.svg" alt="">
          </div>
        </div>
      <div class="list">
        <img src="~assets/imgs/common/liebiao.svg" alt="" />
      </div>
    </div>
    <progress-bar class="progress-bar"/>
  </div>
</template>

<script>
import ProgressBar from 'components/content/progressBar/ProgressBar'

export default {
  components: { ProgressBar },
  name: "PlayNav",
  data() {
    return {
      musicUrl: require('assets/audio/ceshi.mp3'),
      img: require('assets/audio/default.jpg'),
      transformRotate: 0, //旋转值数
      progressBar: 0, //进度条
      progressValue: '0' //滑动条精度
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
    this.$bus.$on('songChange',() => {
      this.$store.state.navMusicDom.pause();
      this.$store.state.playSong.playNow = false;
      this.MusicImgTransformStop();
    })
  },
  methods: {
    //切换图标 播放 或 停止
    playClick() { 
      if (this.playImg) {
        //停止播放
        this.$store.state.navMusicDom.pause();
        this.playImg = false;
        this.MusicImgTransformStop();
      }else {
        //开始播放
        this.$store.state.navMusicDom.play();
        this.playImg = true;
        this.MusicImgTransformStart();
      }
    },
    MusicImgTransformStart() { //开始计时
      clearInterval(this.musicImgTimer);
      this.musicImgTimer = setInterval(() => {
        this.transformRotate += 2;
        this.$refs.musicImg.style.transform = `rotate(${this.transformRotate}deg)`;
        this.progressValue = ((this.$store.state.navMusicDom.currentTime / this.$store.state.navMusicDom.duration).toFixed(4) * 100 ) + '%';
        this.$store.state.playSong .currentPercent = ((this.$store.state.navMusicDom.currentTime / this.$store.state.navMusicDom.duration).toFixed(4) * 100 );
        if (this.$store.state.navMusicDom.currentTime.toFixed(2) == this.$store.state.navMusicDom.duration.toFixed(2)) {
          clearInterval(this.musicImgTimer);
          this.playClick();
        }
      }, 50)
    },
    MusicImgTransformStop() { //停止计时
      clearInterval(this.musicImgTimer);
    },
    PlaysongView() {
      this.$router.push(this.$store.state.playSong.path + this.$store.state.playSong.id);
    }
  },
  mounted() {
    let timer = setInterval(() => {
      if(this.$refs.navMusic) {
        clearInterval(timer);
        this.$store.state.navMusicDom = this.$refs.navMusic;
        this.$store.state.navMusicDom.addEventListener("ended", () => {
          this.playImg = false
        }, false);
      }
    }, 20);
  },
  watch: {
    playImg() {
      if (this.playImg) { //是否结束播放切换图标, 播放, 动画
        this.playImg = true;
        this.MusicImgTransformStart();
        this.$store.state.navMusicDom.play();
      } else {
        this.playImg = false;
        this.MusicImgTransformStop();
        this.$store.state.navMusicDom.pause();
      }
    }
  }
}
</script>

<style scoped>
  .play-nav {
    height: 56px;
    width: 100vw;
    overflow: hidden;
    background-color: white;
    border-top: 1px solid rgb(241, 238, 238);
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 20;
  }
   .play-content {
      display: flex;
   }
    .music-img {
      height: 45px;
      width: 45px;
      display: flex;
      justify-content: center;
    }
      .music-img .imgbg{
        width: 36px;
        height: 36px;
        border-radius: 50%;
        margin-top: 4.5px;
        background: linear-gradient(45deg, rgb(111, 6, 6) 10%, rgb(194, 171, 171), rgb(57, 39, 39) 70%, transparent);
      }
      .music-img .imgbg img {
        height: 100%;
        width: 100%;
        border-radius: 50%;
      }
    .text {
      flex: 1;
      padding-left: 5px;
    }
      .name {
        font-size: 14px;
        line-height: 25px;
        white-space: nowrap;
        text-overflow: ellipsis;
        word-break: break-all;
        overflow: hidden;
        width: 180px;
      }
      .music-name {
        font-size: 12px;
        line-height: 15px;
        color: #a0a0a0;
      }
    .play-muisc {
      height: 45px;
      width: 45px;
      display: flex;
      justify-content: center; 
    }
      .play-muisc .music-img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-top: 10px;
      }
    .list {
      height: 45px;
      width: 50px;
      display: flex;
      justify-content: center; 
    }
      .list img {
        width: 25px;
        height: 25px;
        margin-top: 14px;
      }
    .progress-bar {
      width: 90vw;
      height: 10px;
      left: 5vw;
      position: absolute;
      bottom: 6px;
    }
</style>