<template>
  <div class="song-ranking">
    <div class="rank-nav">
      <div class="ranking-title" 
           v-for="(item, index) in rankingTitle" :key="index"
           :class="{ activeRanking: currIndex === index }"
           @click="setCurrIndex(index)"> {{ item }} </div>
    </div>
    <song-every-day v-show="currIndex === 0"/>
    <song-hot v-show="currIndex === 1"/>
  </div>
</template>

<script>
  import songEveryDay from './minchildrenComps/songEveryDay';
  import SongHot from './minchildrenComps/songHot';

  export default {
  components: { 
    songEveryDay,
    SongHot
  },
    name: 'SongRanking',
    data() {
      return {
        rankingTitle: ['每日榜', '热门榜'],
        currIndex: 0
      }
    },
    props: {
      data: {
        type: Array,
        default: () => []
      }
    },
    methods: {
      setCurrIndex(index) {
        this.currIndex = index;
      }
    },
  }
</script>

<style scoped>
  .song-ranking {
    background-color: rgb(255, 255, 255);
    min-height: calc(100vh - 144px);
    position: relative;
    padding-top: 20px;
  }
    .rank-nav {
      display: flex;
      justify-content: space-evenly;
    }
      .ranking-title {
        font-size: 1rem;
        padding: 0 15px;
        font-weight: 600;
        height: 30px;
        box-sizing: border-box;
        line-height: 30px;
        text-align: center;
      }
      .activeRanking { 
        color: rgb(255, 255, 255);
        background: rgb(113, 106, 106);
        border-radius: 15px;
      }
</style>