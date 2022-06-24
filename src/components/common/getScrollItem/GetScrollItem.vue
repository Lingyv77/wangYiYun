<template>
  <div class="get-scroll-item" @scroll="onScroll">
    <div class="bg"></div>
    <div v-for="(item, index) in list" :key="index" class="item" :class="{ active: index === currIndex+1 }">
      {{ item }}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GetScrollItem',
    props: {
      list: {
        type: Array,
        default: () => []
      },
      date: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        height: 0,
        positionY: 0,
        storagepositionY: 0,
        currIndex: 0
      }
    },
    activated() {
      this.$nextTick(() => {
        let timer = setInterval(() => {
          if (this.$el.offsetHeight) {
            this.height = this.$el.offsetHeight;
            console.log(this.$el.offsetHeight)
            this.$el.scrollTop = (this.height * 0.3333) * (this.list.indexOf(this.date) -1);
            this.currIndex = this.list.indexOf(this.date) - 1;
            this.emitData(this.date);
            clearTimeout(timer);
          }
        }, 50);
      })
    },
    setup(props, context) {
      const emitData = (data) => {
        context.emit('getData',data);
      }

      return {
        emitData
      }
    },
    methods: {
      onScroll(e) {
        clearInterval(this.emitEvent)
        let _this = this;
         this.positionY = e.srcElement.scrollTop; 
       (async function () {
          _this.storagepositionY = await  _this.positionY;
          if (_this.storagepositionY === _this.positionY) { //滚动结束
            _this.currIndex =  Math.round(_this.positionY / (_this.height * 0.3333));
            console.log(_this.height)
            _this.emitEvent = setTimeout(() => {
              _this.emitData(_this.list[_this.currIndex+1]);
            }, 100);
          }
        }) ();
      }
    },
  }
</script>

<style scoped>
  .get-scroll-item {
    height: 90px;
    text-align: center;
    overflow-y: scroll;
    color: rgb(123, 121, 121);
    scroll-snap-type: y mandatory;
  }
  .get-scroll-item::-webkit-scrollbar {
    width: 0;
  }
    .bg {
      display: block;
      background: linear-gradient(rgba(0, 0, 0, 0.7), transparent, rgba(0, 0, 0, 0.7));
      position: absolute;
      z-index: 1;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
    }
    .item {
      height: 33.33%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: relative;
      z-index: 2;
      scroll-snap-align: center;
      font-size: 16px;
    }
    .active {
      color: rgb(201, 201, 201);
      font-size: 19px;
    }
</style>