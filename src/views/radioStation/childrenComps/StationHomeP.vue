<template>
  <div class="station-home-p">
    <more-bar :title="'电台'"/>   
    <div class="box">
      <swiper class="swiper-box" :orderTrue="startOrder">
        <swiper-item v-for="(item, index) in swiperList" :key="index">
          <a href="#">
            <div class="swiper-item">
            <img :src="item.pic" alt="" class="swiper-img">
            <div class="title"> {{item.typeTitle}}</div>
            </div>
          </a>
        </swiper-item>
      </swiper>
      <div class="btn-list flex">
        <div v-for="(item, index) in btnList" :key="index" class="btn-item" @click="toRouter(item.path)">
          <div class="btn-inco">
            <img :src="item.pic" alt="">
          </div>
          <div class="btn-text"> {{ item.text }} </div>
        </div>
      </div>
      <div class="top-title">
        <div class="top-text"> 电台推荐 </div>
      </div>
      <station-item :list="stationList" :showName="true"/>
      <div class="top-title flex">
        <div class="top-text"> 精品推荐 </div>
        <div class="right-text" @click="toRouter('/classifyInfo/0')"> 全部精品 </div>
      </div>
      <station-item :list="boutiqueRecommendList" :showName="true" :showPay="true"/>
      <station-recommend v-for="(item, index) in recommendList" 
                         :id="item.id" 
                         :name="item.name"
                         :key="index"/>
    </div>
    <toast :text="'无数据加载!'" :order="orderState"/>
  </div>
</template>

<script>
  import moreBar from 'components/content/sheetBar/SheetBar' //bar
  import Swiper from 'components/common/swiper/Swiper' //轮播图
  import SwiperItem from 'components/common/swiper/SwiperItem' //轮播图项
  import StationItem from 'views/radioStation/childrenComps/StationItem' //列表图片显示组件
  import StationRecommend from './StationRecommend'
  import Toast from 'components/content/toast/Toast'

  import { getBanner, getPerfered, getPayBoutique, getClassify } from 'network/radioStation'


  
  export default {
    name: "StationHomeP",
    components: { 
      moreBar,
      Swiper,
      SwiperItem,
      StationItem,
      StationRecommend,
      Toast
    },
    data() {
      return {
        swiperList: [],
        startOrder: false, //是否准备好
        btnList: [ //btn列表
          {
            text: '电台分类',
            pic: require('assets/imgs/radioStation/HomeP/fl.svg'),
            path: '/myMessage/radioStation/stationHomeP/stationClassify'
          },
          {
            text: '电台排行',
            pic: require('assets/imgs/radioStation/HomeP/ph.svg'),
            path: '/myMessage/radioStation/stationHomeP/stationRanking'
          },
          {
            text: '付费精品',
            pic: require('assets/imgs/radioStation/HomeP/jp.svg'),
            path: '/classifyInfo/0'
          },
          {
            text: '声之剧场',
            pic: require('assets/imgs/radioStation/HomeP/jc.svg'),
            path: 0
          }
        ],
        stationList: [], //电台推荐列表
        boutiqueRecommendList: [], //精品推荐列表
        recommendList: [], //推荐列表
        orderState: false //吐司
      }
    },
    created() {
      this.getBanner();
      this.getPerfered();
      this.getPayBoutique();
      this.getClassify();
      this.$bus.$on('stationRecommendHappenToast',() => {
        this.orderState = !this.orderState;
      })
    },
    methods: {
      /**
       * 获取轮播图信息
       */
      getBanner() {
        getBanner().then(res => {
          this.swiperList = res.data;
          this.startOrder = true;
        })
      },
      /**
       * 今日优选信息
       */
      getPerfered() {
        getPerfered().then(res => {
          this.stationList = res.data
        })
      },
      /**
       * 精品推荐信息
       */
      getPayBoutique() {
        getPayBoutique(3).then(res => {
          for (let item of res.data.list) {
            this.boutiqueRecommendList.push({
              name: item.creatorName,
              rcmdText: item.name,
              picUrl: item.picUrl,
              id: item.id
            })
          }
        })
      },
      /**
       * 推荐列表id 和 name
       */
      getClassify() {
        getClassify().then(res => {
          this.recommendList = res.categories;
        })
      },
      /**
       * 路由跳转
       */
      toRouter(path) {
        if (path) {
          this.$router.push(path);
        }
      },
    },
  }
</script>

<style scoped>
  .station-home-p {
    background-color: white;
    height: calc(100vh - 56px);
    position: relative;
    z-index: 10;
  }
    .box {
      height: calc(100% - 44px);
      overflow: scroll;
      padding-bottom: 30px;
    }
      .swiper-box {
        width: 94%;
        margin-left: 3%;
        position: relative;
        margin-top: 10px;
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
            background-color: #da231b;
          }
      .btn-item {
        flex: 1;
        text-align: center;
      }
      .btn-list {
        margin-top: 10px;
      }
        .btn-inco {
          background: linear-gradient(to right, #d84e4e, red);
          width: 45px;
          height: 45px;
          border-radius: 50%;
          margin: 0 auto;
        }
          .btn-inco img {
            width: 25px;
            height: 25px;
            margin: 10px auto;
          }
          .btn-text {
            font-size: 14px;
            height: 30px;
            line-height: 30px;
          }
      .top-title {
        width: 100%;
        padding: 10px 15px;
        position: relative;
      }
      .top-text {
        font-size: 17px;
        font-weight: 600;
      }
      .right-text {
        position: absolute;
        right: 20px;
        font-size: 12px;
        height: 18px;
        border-radius: 10px;
        border: 1px solid rgb(103, 103, 110);
        text-align: center;
        padding: 0 5px;
        box-sizing: content-box;
        line-height: 18px;
      }
</style>