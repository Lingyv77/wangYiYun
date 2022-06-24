<template>
  <div class="anchor-ranking">
    <div class="rank-nav">
      <div class="ranking-title" 
           v-for="(item, index) in rankingTitle" :key="index"
           :class="{ activeRanking: currIndex === index }"
           @click="setCurrIndex(index)"> {{ item }} </div>
    </div>
    <anchor-every-day v-show="currIndex === 0" :data="data"/>
    <anchor-hot v-show="currIndex === 1"/>
    <anchor-new-men v-show="currIndex === 2"/>
  </div>
</template>

<script>

  import anchorEveryDay from './minchildrenComps/anchorEveryDay'
  import AnchorHot from './minchildrenComps/anchorHot';
  import AnchorNewMen from './minchildrenComps/anchorNewMen';

  export default {
    name: 'anchorRanking',
    components: { 
      anchorEveryDay,
      AnchorHot,
      AnchorNewMen 
    },
    props: {
      data: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        rankingTitle: ['每日榜' , '热门榜' , '新人榜'],
        currIndex: 0
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
  .anchor-ranking {
    background-color: white;
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