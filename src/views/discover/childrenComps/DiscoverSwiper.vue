<template>
    <swiper class="swiper-box" :orderTrue="startOrder">
      <swiper-item v-for="(item, index) in swiperList" :key="index">
        <a :href="item.url">
          <div class="swiper-item">
          <img :src="item.pic" alt="" class="swiper-img">
          <div class="title" v-bind:style='{background:item.titleColor === "blue" ? "#326ef8" : item.titleColor}'> {{item.typeTitle}}</div>
          </div>
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
  import { Swiper, SwiperItem } from 'components/common/swiper'
  import { getBanner } from 'network/discover'
 
  export default {
    name: "DiscoverSwiper",
    data() {
      return {
        swiperList: [],
        startOrder: false, //是否准备好
        countReduce: 3, //准许初次加载次数
      }
    },
    components: {
      Swiper,
      SwiperItem,
    },
    created() {
      this.getBanner();
    },
    methods: {
      getBanner() {
        clearTimeout(this.bannerTimer) ;
        if (this.countReduce) {
          this.countReduce--;
          getBanner(1).then(res => {
            this.swiperList = res.banners;
            this.startOrder = true;
          }).catch(() => {
            this.bannerTimer = setTimeout(() => {
              this.getBanner();
            }, 3000);
          })
        }
      }
    },
  }
</script>

<style scoped>
  .swiper-box {
    width: 94%;
    margin-left: 3%;
    position: relative;
  }
  .swiper-item {
    position: relative;
    height: 150px;
    background-color: rgba(0,0,0,0.3);
  }
  .swiper-img {
    vertical-align: middle;
    width: 100%;
    height: 100%;
  }
  .title {
    position: absolute;
    color: white;
    right: 0;
    bottom: 0;
    padding: 5px 8px;
    border-top-left-radius: 10px;
    font-size: 13px;
  }
</style>