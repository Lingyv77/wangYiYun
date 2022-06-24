<template>
  <div id="hy-swiper">
    <div class="swiper" ref="swiper" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
      <slot></slot>
    </div>
    <div class="indicator">
      <slot name="indicator" v-if="showIndicator && slideCount > 1">
        <div v-for="(item, index) in slideCount" class="item-ind" :key="index" :class="{active: index === currentIndex-1}"></div>
      </slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Swiper",
    props: {
      interval: { // 轮播间隔时间
        type: Number,
        default: 3000
      },
      animDuration: { // 延迟(过度/等待)时间
        type: Number,
        default: 300
      },
      moveRatio: { // 滑动最低比例切换轮播图
        type: Number,
        default: 0.25
      },
      showIndicator: { // 是否显示indicator
        type: Boolean,
        default: true
      },
      orderTrue: { //是否准备好
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        slideCount: 0, // 滚动元素个数
        totaWidth: 0, // swiper滚动宽度距离
        swiperStyle: {}, // swiper样式用于过度等位置修改
        currentIndex: 1,  // 当前下标元素显示
        scrolling: false //是否处于滚动状态
      }
    },
    watch: {
      orderTrue() {
        if (this.orderTrue) { //组件数据准好则开始操作
        this.start();
        }
      }
    },
    methods: {
      start() {
        setTimeout(() => {
          // 操作DOM swiper数值
          this.handleDom();
  
          this.startTimer();
        }, 300);
      },
      /**
       * 开启定时器
       */
      startTimer() {
        this.playTimer = setInterval(() => {
          this.currentIndex++;
          this.scrollCountent(-this.currentIndex * this.totaWidth);
        }, this.interval);
      },
      /**
       * 关闭定时器
       */
      stopTimer() {
        clearInterval(this.playTimer);
      },
      /**
       * 过渡滚动动画
       */
      scrollCountent(currentPosition) {
        // 1.处于滚动状态中
        this.scrolling = true;

        // 2.开始过渡
       this.swiperStyle.transition ='transform '+ this.animDuration + 'ms';
        this.setTransform(currentPosition);

        // 3.调整位置矫正
        this.checkPosition();

        // 4.滚动状态结束
        this.scrolling = false;
      },
      /**
       * 矫正正确位置
       */
      checkPosition() {
        setTimeout(() => {
          // 零延迟矫正位置
          this.swiperStyle.transition = '0ms';
          if (this.currentIndex >= this.slideCount + 1) {
            this.currentIndex = 1;
          }else if(this.currentIndex <= 0) {
            this.currentIndex = this.slideCount;
          }
          this.setTransform(-this.currentIndex * this.totaWidth);
        }, this.animDuration);
      },
      /**
       * 移动位置
       */
      setTransform(position) {
        this.swiperStyle.transform = `translateX(${position}px)`;
        this.swiperStyle['-webkit-transform'] = `translateX(${position}px)`;
        this.swiperStyle['-ms-transform'] = `translateX(${position}px)`;
      },
      /** 
       * 组件创建时DOM获取,赋值,操作
      */
      handleDom() {
        // 获取DOM
        let swiperEl = this.$refs.swiper;
        let swiperEls = swiperEl.children;

        // 将操作数据赋值
        this.slideCount = swiperEls.length;  //保存slide数量
        
        if (this.slideCount > 1) {
          this.swiperStyle = swiperEl.style; //与元素样式通过js机制绑定
          this.totaWidth = swiperEl.offsetWidth; //赋值宽度
          let cloneFrist = swiperEls[0].cloneNode(true); //克隆第一个
          let cloneLast = swiperEls[swiperEls.length -1 ].cloneNode(true); //克隆最后一个
          swiperEl.insertBefore(cloneLast,swiperEls[0]); //插入
          swiperEl.appendChild(cloneFrist); //添加
        }
        this.setTransform(-this.totaWidth); //开始进行矫正 下标[1]
      },
      /**
       * 拖动事件 start,move,end
       */
      touchStart(e) {
        if (this.scrolling) return;
        // 操作start定制定时器
        this.stopTimer();
        this.distance = 0;
        // 开始start 获取x轴
        this.startX = e.touches[0].pageX;
        console.log(e)
      },
      touchMove(e) {
        // 移动位置
        this.currentX = e.touches[0].pageX;
        // 移动距离
        this.distance = this.currentX - this.startX;
        if (this.distance >= this.totaWidth) {
          this.distance = this.totaWidth;
        }else if (this.distance <= -this.totaWidth) {
          this.distance = - this.totaWidth;
        }
        // 当前位置
        let currentPosition = -this.currentIndex * this.totaWidth;
        // 移动后动画位置
        let currentDistance = this.distance + currentPosition;
        this.setTransform(currentDistance);
      },
      touchEnd() {
        // 1.获取移动的距离
        let currentMove = Math.abs(this.distance);

        if (this.distance > 0 && currentMove >= this.totaWidth * this.moveRatio) {
          this.currentIndex--;
        }else if (this.distance < 0 && currentMove >= this.totaWidth * this.moveRatio) {
          this.currentIndex++;
        }

        // 拖动结束动画开始
        this.scrollCountent(-this.currentIndex * this.totaWidth);
        // 重新开启定时器
        this.startTimer();
      }
    }
  }
</script>

<style scoped>
  #hy-swiper {
    overflow: hidden;
    border-radius: 10px;
  }
    .swiper {
      display: flex;
      position: relative;
    }
    .indicator {
      display: flex;
      width: 94vw;
      position: absolute;
      justify-content: center;
      bottom: 8px;
    }
      .item-ind {
        width: 6px;
        height: 6px;
        background-color: rgba(255,255,255, 0.5);
        border-radius: 50%;
        margin-left: 6px;
      }
      .active {
        background-color: white;
      }
</style>