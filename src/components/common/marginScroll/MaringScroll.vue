<template>
  <div id="margin-scroll" ref="minn" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
    <div class="scroll-wrap" ref="minnscroll">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MaringScroll",
    data() {
      return {
        startPosition: 0, //start x轴位置
        distance: 0, //滑动距离
        resultDistance: 0, //最终距离
        minnStyle: {}, //样式
        tansfromTimer: 500, //过渡时间
        positionDistance: 100, //拉距范围
        clientWidth: 0, //视窗 vw
        totaWidth: 0, //minnscroll 的宽度
        differenceWidth: 0, //差值
      }
    },
    mounted() {
      this.minn = this.$refs.minn;
      this.minnscroll = this.$refs.minnscroll;
      let setValue = setInterval(() => {
        if (this.minnscroll.offsetWidth) {
          clearInterval(setValue);
          this.minnStyle = this.minnscroll.style;
          this.totaWidth = this.minnscroll.offsetWidth;
          this.clientWidth =  this.minn.clientWidth;
          this.differenceWidth = this.totaWidth - this.clientWidth;
        }
      }, 20)
    },
    methods: {
      transformLeft(position) {
      this.minnStyle.left = position + 'px';
      },
      touchStart(e) {
        this.startPosition = e.touches[0].pageX;
      },
      touchMove(e) {
        this.distance =  e.touches[0].pageX - this.startPosition;
        if (this.minnscroll.offsetLeft <= 0 && -this.minnscroll.offsetLeft <= this.differenceWidth) {
          this.transformLeft(this.resultDistance + this.distance);
        }
        if (this.minnscroll.offsetLeft >= 0) {
          if (this.resultDistance + this.distance <= this.positionDistance) {
            this.transformLeft(this.resultDistance + this.distance);
          }
        }
        if (this.minnscroll.offsetLeft <= -(this.differenceWidth)) {
          if (-(this.resultDistance + this.distance) <= this.positionDistance + this.differenceWidth) {
            this.transformLeft(this.resultDistance + this.distance);
          }
        }
      },
      transformFunc(position) {
        this.minnStyle.transition = this.tansfromTimer + 'ms';
        this.transformLeft(position);
        setTimeout(() => {
          this.minnStyle.transition = '0ms';
        }, this.tansfromTimer)
      },
      touchEnd() {
        this.resultDistance += this.distance;
        if (this.minnscroll.offsetLeft > 0) {
          this.transformFunc(0);
          this.resultDistance = 0;
        }
        if (-this.minnscroll.offsetLeft > this.differenceWidth) {
          this.transformFunc(-this.differenceWidth);
          this.resultDistance = -this.differenceWidth;
        }
      }
    },
  }
</script>

<style scoped>
  #margin-scroll {
    width: 100vw;
    overflow: hidden;
    position: relative;
  }
    .scroll-wrap { 
      display: flex;
      position: absolute;
      left: 0;
    }
</style>