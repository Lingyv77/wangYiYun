<template>
  <div class="play-song-bar flex">
    <div class="item playConfig">
      <img src="~assets/imgs/playSong/xunhuan.svg" alt="" />
    </div>
    <div class="item toFrom">
      <img src="~assets/imgs/playSong/s.svg" alt="" />
    </div>
    <div class="item playSong" @click="playSong">
      <img v-if="playImg" src="~assets/imgs/playSong/zanting.svg" alt="" />
      <img v-else src="~assets/imgs/playSong/bofang.svg" alt="" />
    </div>
    <div class="item toFall">
      <img src="~assets/imgs/playSong/x.svg" alt="" />
    </div>
    <div class="item share">
      <img src="~assets/imgs/playSong/liebiao.svg" alt="" />
    </div>
  </div>
</template>

<script>
  export default {
    name: "PlaySongBar",
    data() {
      return {
      }
    },
    computed: {
      playImg: {
        get() {
          return this.$store.state.playSong.playNow;
        },
        set(value) {
          this.$store.state.playSong.playNow = value;
        }
      }
    },
    methods: {
      playSong() {
        if (this.$store.state.playSong.playNow) {
          this.$store.state.playSong.playNow = false;
          this.$store.state.navMusicDom.pause();
        }else {
          this.$store.state.navMusicDom.play();
          this.$store.state.playSong.playNow = true;
        }
      }
    },
    watch: {
    }
  }
</script>

<style scoped>
  .play-song-bar {
    margin-top: 15px;
  }
    .item {
      flex: 1;
      display: flex;
      justify-content: center;
      height: 45px;
    }
    .item img {
      margin-top: 5px;
      width: 35px;
      height: 35px;
    }
    .playSong img{
      margin: 0;
      width: 45px;
      height: 45px;
    }
</style>