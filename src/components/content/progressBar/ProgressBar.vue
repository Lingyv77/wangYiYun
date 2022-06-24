<template>
  <div class="progress-bar" ref="progressBar" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
    <div class="bg">
      <div class="progress-value" :style="{width: $store.state.playSong.currentPercent + '%', background: '' + bg}" ref="progressValue">
        <div class="progress-inco" :style="{backgroundColor: small}"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ProgressBar",
    props: {
      bg: {
        type: String,
        default: '#d197d5'
      },
      small: {
        type: String,
        default: '#e78a8a'
      }
    },
    methods: {
      touchStart(e) {
        this.$store.state.navMusicDom.pause();
        this.positionStart = e.touches[0].pageX;
        let progress = (((e.touches[0].pageX - this.$el.offsetLeft) / this.$refs.progressBar.offsetWidth)); //移动进度
        this.$store.state.navMusicDom.currentTime = progress * this.$store.state.navMusicDom.duration;
        this.positionValue = (progress * 100).toFixed(2);
        this.$store.state.playSong.currentPercent = this.positionValue; 
        this.$refs.progressValue.style.width = this.positionValue + '%';
      },
      touchMove(e) {
        this.$store.state.navMusicDom.pause();
        this.positionStart = e.touches[0].pageX;
        let progress = (((e.touches[0].pageX - this.$el.offsetLeft) / this.$refs.progressBar.offsetWidth)) ; //移动进度
        if (progress >= 1) progress = 1; //束缚范围防止超界
        this.$store.state.navMusicDom.currentTime = progress * this.$store.state.navMusicDom.duration;
        this.positionValue = (progress * 100).toFixed(2);
        this.$store.state.playSong.currentPercent = this.positionValue; 
        this.$refs.progressValue.style.width = this.positionValue + '%';
      },
      touchEnd() {
        if (this.$store.state.playSong.playNow) {
          this.$store.state.navMusicDom.play();
        }
      }
    }
  }
</script>

<style scoped>
    .progress-bar {
      height: 100%;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .bg {
      position: relative;
      background-color: #e0dcdc;
      border-radius: 1px;
    }
      .progress-value {
        height: 3px;
        width: 0;
        position: relative;
      }
        .progress-inco {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: absolute;
          right: -4px;
          bottom: -2px;
        }
</style>