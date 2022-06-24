<template>
    <div class="transform-swiper" ref="transfromSwiper">
      <div  class="music-face"  v-for="(item ,index) in songList" :key="index"  @click="faceClick(currentIndex[index])">
        <item-list :music-message="item" :use-song="currentIndex[index]"/>
      </div>
    </div>
</template>

<script>
  import ItemList from './ItemList';

  export default {
    namne: "TransformSwiper",
    data() {
      return {
        currentIndex: [0,1,2,3],
      }
    },
    props: {
    songList: {
        type: Array,
        defalut: []
      }
    },
    components: { 
      ItemList 
    },
    methods: {
      //接收 'currentIndexRight' 和 'currentIndexLeft'
      currentIndexLeft() {
        for (let i = 0; i < this.currentIndex.length; i++) {
          this.currentIndex[i] = ((this.currentIndex[i] + 1) % 4)
        }
        this.transform(this.currentIndex);
      },
      currentIndexRight() {
        for (let i = 0; i < this.currentIndex.length; i++) {
          this.currentIndex[i] = this.currentIndex[i] - 1 === -1 ? 3 : this.currentIndex[i] - 1;
        }
        this.transform(this.currentIndex);
      },
      transform(args) {
        for (const index in args) {
          if (args[index] === 0) {
            this.$refs.transfromSwiper.children[index].style.left = 0;
            this.$refs.transfromSwiper.children[index].style.transform = 'scale(1)';
            this.$refs.transfromSwiper.children[index].style.zIndex = 3;
          }else if (args[index] === 1) {
            this.$refs.transfromSwiper.children[index].style.left = '35vw';
            this.$refs.transfromSwiper.children[index].style.transform = 'scale(0.9)';
            this.$refs.transfromSwiper.children[index].style.zIndex = 2;
          }else if (args[index] === 2) {
            this.$refs.transfromSwiper.children[index].style.left = 0;
            this.$refs.transfromSwiper.children[index].style.transform = 'scale(0.9)';
            this.$refs.transfromSwiper.children[index].style.zIndex = 1;
          }else if (args[index] === 3) {
            this.$refs.transfromSwiper.children[index].style.left = '-35vw';
            this.$refs.transfromSwiper.children[index].style.transform = 'scale(0.9)';
            this.$refs.transfromSwiper.children[index].style.zIndex = 2;
          }
        }
      },
      faceClick(currentIndex) { //currentIndex 页面所在index值, index 所在songList位置
        if (currentIndex === 0) {
          //面板操作(播放, 跳转)
        }else if (currentIndex === 1) { //right 操作
          this.currentIndexRight();
        }else if (currentIndex === 3) {
          this.currentIndexLeft(); //left 操作
        }
      }
    }
  }
</script>

<style scoped>
    .transform-swiper {
      margin-top: 10px;
      width: 76vw;
      margin-left: 12vw;
      height: 160px;
      position: relative;
      margin-bottom: 10px;
    }
      .music-face {
      background-color: white;
      border-radius: 10px;
      box-shadow: 1px 2px 6px rgba(144, 134, 134, 0.7);
      width: 100%;
      height: 160px;
      display: flex;
      flex-direction: column;
      padding: 0 7px;
      position: absolute;
        transition: all 0.5s;
      }
      .transform-swiper .music-face:nth-of-type(1) {
        left: 0;
        transform: scale(1);    
        z-index: 3;
      }
      .transform-swiper .music-face:nth-of-type(2) {
        left: 35vw;
        transform: scale(0.9);
        z-index: 2;
      }
      .transform-swiper .music-face:nth-of-type(3) {
        left: 0;
        transform: scale(0.9);
        z-index: 1;
      }
      .transform-swiper .music-face:nth-of-type(4) {
        left: -35vw;
        transform: scale(0.9);
        z-index: 2;
      }
</style>