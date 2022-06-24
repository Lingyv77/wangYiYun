<template>
  <div class="classify-info">
    <sheet-bar :title="title"/>
    <div class="box">
      <classify-info-item :list="classifyList"/>
    </div>
  </div>
</template>

<script>
  import SheetBar from 'components/content/sheetBar/SheetBar'
  import ClassifyInfoItem from './ClassifyInfoItem'

  import { getHotStation, getPaySfit } from 'network/radioStation'

  export default {
    name: "ClassifyInfo",
    components: { 
      SheetBar,
      ClassifyInfoItem 
    },
    data() {
      return {
        title: '',
        classifyList: [] //电台信息列表
      }
    },
    created() {
      this.getRadio();
    },
    methods: {
      /**
       * 获取电台信息列表
       */
      getRadio() {
        if(this.$route.params.type > 0) {
          getHotStation(this.$route.params.type, 30, 0).then(res => {
            if (res.hasMore) {
              this.title = res.djRadios[0].category;
              for (let item of res.djRadios) {
                this.classifyList.push({
                  id: item.id, //id
                  price: item.price, //价格
                  name: item.name, //名称
                  rcmdText: item.rcmdtext, //介绍信息
                  subCount: item.subCount, //阅览量
                  counter: item.programCount, //节目集
                  picUrl: item.picUrl, //图片路径
                  desc: item.desc  //信息
                })
              }
            }
          })
        }else {
          this.title = '付费精选'
          getPaySfit(30, 0).then(res => {
            if (res.data.hasMore) {
              for (let item of res.data.list) {
                this.classifyList.push({
                  id: item.id, //id
                  price: item.originalPrice, //价格
                  name: item.name, //名称
                  rcmdText: item.rcmdText, //介绍信息
                  subCount: item.subCount, //阅览量
                  counter: item.programCount, //节目集
                  picUrl: item.picUrl, //图片路径
                })
              }
            }
          })
        }
      }
    },
  }
</script>

<style scoped>
  .classify-info {
    height: calc(100vh - 56px);
    background-color: white;
    position: relative;
    z-index: 10;
  }
    .box {
      height: calc(100% - 44px);
      overflow: scroll;
    }
</style>