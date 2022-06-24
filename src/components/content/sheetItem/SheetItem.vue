<template>
  <div class="sheet-item">
    <div class="top-img" :style="{width: vwh+'px',height: vwh +'px'}">
      <div class="bg">
        <div class="small-bg"></div>
        <div class="big-bg"></div>
      </div>
      <img :src="imgUrl" class="img" alt=""/>
      <div class="play-counter">▷ {{playCount}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SheetItem",
    props: {
      imgUrl: {
        type: String,
        default: ''
      },
      playCount: {
        type: String,
        default: '0'
      },
      vwh: {
        type: Number,
        default: 100
      }
    }
  }
</script>

<style scoped>
  .sheet-item {
    display: flex;
    justify-content: center;
  }
    .top-img {
      width: 100px;
      height: 100px;
      border-radius: 8px;
      overflow: hidden;
      position: relative;
    }
      .bg {
        width: 100%;
        height: 100%;
        position: absolute;
        background-color: rgba(0,0,0, 0.3);
        left: 0;
        top: 0;
        z-index: 2;
      }
        .small-bg {
          width: 30%;
          height: 30%;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.5);
          position: absolute;
          left: 1%;
          bottom: 1%;
        }
        .big-bg {
          width: 60%;
          height: 60%;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.5);
          position: absolute;
          right: -10%;
          top: -10%;
        }
      .img {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 3;
      }
        .play-counter {
          color: white;
          font-size: 12px;
          position: absolute;
          right: 3px;
          top: 1px;
          z-index: 4;
        }
</style>