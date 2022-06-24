<template>
  <div class="load-toast" ref="loadToast">
    <img src="~assets/imgs/common/loadToast.png" alt="">
  </div>
</template>

<script>
  export default {
    name: 'LoadToast',
    props: {
      order: {
        type: Number,
        defalut: 2
      },
      top: {
        type: Number,
        defalut: 0
      }
    },
    methods: {
      start() {
        this.$refs.loadToast.style.top = this.top + 'px';
        this.$refs.loadToast.style.opacity = '1';
        this.$refs.loadToast.style.transform = 'rotate(-2000deg)';
        this.$refs.loadToast.style.transition = '5s transform linear, 0.3s opacity';
      },
      stop() {
        this.$refs.loadToast.style.transition = 'none';
        this.$refs.loadToast.style.opacity = '0';
        this.$refs.loadToast.style.transform = 'rotate(0deg)';
        this.$refs.loadToast.style.top = -this.$refs.loadToast.offsetHeight + 'px';  
      }
    },
    watch: {
      order() {
        if (this.order === 1)
          this.start();
        else if (this.order === 0)
          this.stop();
      }
    }
  }
</script>

<style scoped>
  .load-toast {
    width: 30px;
    height: 30px;
    position: fixed;
    z-index: 99;
    left: calc(50vw - 15px);
    top: 100px;
    transition: 5s transform linear, 0.3s opacity;
    transform: rotate(0deg);
    opacity: 0;
  }
    .load-toast img {
      width: 100%;
      height: 100%;
      vertical-align: middle;
    }
</style>