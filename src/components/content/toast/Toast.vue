<template>
  <div class="toast" :style="{ color: color, backgroundColor: bg }">
    {{ text }}
  </div>
</template>

<script>

  export default {
    name: 'Toast',
    props: {
      text: {
        type: String,
        default: '加载成功'
      },
      color: {
        type: String,
        default: 'white'
      },
      bg: {
        type: String,
        default: 'rgba(0,0,0,0.7)'
      },
      order: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      start() {
        this.$el.style.top = '40vh';
        this.$el.style.opacity = '1';
      },
      stop() {
        this.$el.style.opacity = '0';
        this.stopTimer = setTimeout(() => {
          this.$el.style.top = -this.$el.offsetHeight + 'px';  
        }, 1000);
      },
      /**
       * 执行吐司过程
       */
      fadeTrans() { 
        this.start();
        clearTimeout(this.stopTimer);
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.stop();
        }, 2000);
      }
    },
    watch: {
      order() {
        this.fadeTrans();
      }
    }
  }
</script>

<style scoped>
  .toast {
    padding: 5px 7px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    width: 40vw;
    font-size: 16px;
    position: fixed;
    top: -20px;
    left: calc(50vw - 20vw - 5px);
    letter-spacing: 3px;
    z-index: 99;
    opacity: 0;
    transition: 500ms opacity linear;
  }
</style>