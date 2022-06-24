<template>
  <div class="ranking-list">
    <sheet-bar class="top-bar" :title="'主播电台排行榜'">
      <template v-slot:left>
        <div @click="backClick">
          <img src="~assets/imgs/radioStation/fanhui.png" alt="">
        </div>
      </template>
    </sheet-bar>
    <div class="nav">
      <div v-for="(item, index) in navList" :key="index" 
        class="nav-item-title" 
        :class="{ active: index === currIndex }"
        @click="setTitle(index)">
        {{ item }}
      </div>
    </div>
    <anchor-ranking v-show="currIndex===0"/>
    <song-ranking v-show="currIndex===1"/>
    <blog-ranking v-show="currIndex===2"/>
  </div>
</template>

<script> 
  import SheetBar from 'components/content/sheetBar/SheetBar'
  
  import AnchorRanking from './AnchorRanking'
  import SongRanking from './SongRanking'
  import BlogRanking from './BlogRanking'

  export default {
    name: "rankingList",
    data() {
      return {
        navList: ['主播','声音','博客'],
        currIndex: 0,
      }
    },
    components: {
      SheetBar,
      SongRanking,
      AnchorRanking,
      BlogRanking
    },
    methods: {
      backClick() { //返回
        this.$router.go(-1)
      },
      setTitle(index) {
        this.currIndex = index;
      },
    }
  }
</script>

<style scoped>
  .ranking-list {
    padding-top: 89px;
    height: calc(100vh - 56px);
    background-color: white;
    text-align: center;
    overflow: scroll;
  }
    .top-bar {
      position: fixed;
      width: 100vw;
      z-index: 9;
      left: 0;
      top: 0;
      right: 0;
      background-color: white;
      box-shadow: 1px 0 3px rgba(214, 206, 206, 0.7);
    }
    .nav {
      height: 45px;
      border-bottom: 1px solid #e6e6e6;
      display: flex;
      position: fixed;
      width: 100vw;
      z-index: 9;
      left: 0;
      top: 44px;
      right: 0;
      background-color: white;
    }
      .nav-item-title {
        flex: 1;
        display: flex;
        justify-content: center;
        flex-direction: column;
        position: relative;
      }
      .active {
        color: rgb(8, 128, 1);
      }
        .active::before {
          display: block;
          content: " ";
          width: 19vw;
          height: 0.55556vw;
          background-color: rgb(8, 128, 1);
          position: absolute;
          bottom: 1.2vw;
          left: 7vw;
        }
</style>