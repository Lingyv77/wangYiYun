<template>
  <div class="lyirc-config">
    <div class="color">
      <div class="color-title">颜色:</div>
      <div v-for="(item, index) in colorList" :key="index" class="item" @click="changeLyircColor(item, index)" :style="{ backgroundColor: item }">
        <div :class="{ wrieIndex: $store.state.lyirc.lyircColorIndex === index }"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LyircConfig',
    data() {
      return {
        colorList: ['rgb(11, 88, 39)','rgb(202, 82, 82)','rgb(170, 122, 214)','rgb(72, 154, 72)','#98b6e9','rgb(181, 146, 146)','rgb(0, 255, 94)'],
      }
    },
    methods: {
      changeLyircColor(item, index) {
        this.$store.state.lyirc.lyircColor = item;
        this.$store.state.lyirc.lyircColorIndex= index;
      }
    },
  }
</script>

<style scoped>
  .lyirc-config {
    height: 100px;
    width: 100vw;
    background-color: rgb(0, 0, 0, 0.1);
    padding: 10px;
    position: absolute;
    top: -100px;
    left: 0;
    right: 0;
  } 
    .color-title {
      color: white;
      font-size: 18px;
      float: left;
    }
      .item {
        height: 20px;
        width: 20px;
        border-radius: 50%;
        float: left;
        margin: 4px 10px;
        position: relative
      }
        .wrieIndex {
          width: 100%;
          height: 2px;
          background-color: white;
          position: absolute;
          bottom: -5px;
        }
</style>