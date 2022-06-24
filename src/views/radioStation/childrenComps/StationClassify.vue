<template>
  <div class="station-classify">
    <div class="station-classify-scroll">
      <sheet-bar class="top-bar" :title="'电台分类'">
        <template v-slot:left>
          <div @click="backClick">
            <img src="~assets/imgs/radioStation/fanhui.png" alt="">
          </div>
        </template>
      </sheet-bar>
        <p>热门分类</p>
        <div class="classify-warp">
          <div v-for="(item, index) in hotList" :key="index" @click="toRouter(item.id)">
            <div class="img"><img :src="item.picUrl"/></div>
            <div class="name">{{ item.name }}</div>
          </div>
        </div>
        <p>更多分类</p>
        <div class="classify-warp">
          <div v-for="(item, index) in moreList" :key="index" @click="toRouter(item.id)">
            <div class="img"><img :src="item.picUrl"/></div>
            <div class="name">{{ item.name }}</div>
          </div>
        </div>
      </div>
      <toast :text="'无数据加载!'" :order="orderState"/>
  </div>
</template>

<script>
  import SheetBar from 'components/content/sheetBar/SheetBar'
  import Toast from 'components/content/toast/Toast'

  import { getClassify, getHotStation } from 'network/radioStation'

  export default {
    name: "StationClassify",
    components: { 
      SheetBar,
      Toast 
    },
    data() {
      return {
        classifyList: [],
        hotList: [],
        moreList: [], 
        orderState: false //吐司
      }
    },
    created() {
      getClassify().then(res => {
        for (let item of res.categories) {
          this.classifyList.push({
            id: item.id,
            name: item.name,
            picUrl: item.pic56x56Url
          })
        }
        this.hotList = this.classifyList.slice(0,6)
        this.moreList = this.classifyList.slice(6)
      })
    },
    methods: {
      backClick() { //返回
        this.$router.go(-1)
      },
      toRouter(id){
        getHotStation(id, 30, 0).then(res => {
          if (res.hasMore) {
            this.$router.push('/classifyInfo/'+id);
          }else {
            this.orderState = !this.orderState;
          }
        })
      }
    },
  }
</script>

<style scoped>
  .station-classify {
    padding-top: 44px;
    height: calc(100vh - 56px);
    background-color: white;
    text-align: center;
    overflow: scroll;
  }
    .station-classify-scroll {
      height: auto;
      padding-bottom: 20px;
    }
      .top-bar {
        position: fixed;
        width: 100vw;
        z-index: 9;
        left: 0;
        top: 0;
        right: 0;
        background-color: white;
        box-shadow: 1px 0 3px rgba(214, 206, 206, 0.7);
      }
        p {
          padding: 20px 0 12px;
          font-size: 1rem;
          font-weight: 600;
        }
        .classify-warp {
          border-top: 1px solid #dfdfdf;
          display: flex;
          flex-wrap: wrap;
        }
          .classify-warp > div {
            width: 50vw;
            box-sizing: border-box;
            padding: 16px 0;
            font-size: 14px;
            border-bottom: 1px solid #dfdfdf ;
            display: flex;
          }
            .classify-warp div .img {
              flex: 2;
              display: flex;
              justify-content: flex-end;
            }
              .classify-warp div .img img{
                width: 30px;
                height: 30px;
              }
            .classify-warp div .name {
              flex: 3;
              text-align: left;
              font-size: 14px;
              width: 30px;
              line-height: 30px;
              padding-left: 10px;
              border-right: 1px solid #dfdfdf;
            }
</style>