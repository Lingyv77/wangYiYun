<template>
  <div class="discover-mv">
    <top-title :title="['最新MV']"/>
    <maring-scroll class="scroll-wrap">
      <div v-for="(item, index) in mvList" :key="index" class="item">
        <div class="img">
          <img v-lazy="item.cover" alt="">
          <div class="icon">▷ {{item.playCount}}</div>
        </div>
        <div class="name">{{item.name}}</div>
        <div class="artist">{{item.artistName}}</div>
      </div>
    </maring-scroll>
  </div>
</template>

<script>
  import MaringScroll from 'components/common/marginScroll/MaringScroll'
  import TopTitle from 'components/content/topTitle/TopTitle'

  import { getNewMv } from 'network/discover'

  import { toStringNum } from 'common/common'

  export default {
    name: "DiscoverMv",
    data() {
      return {
        mvList: [],
        countReduce: 3, //准许初次加载次数
      }
    },
    components: { 
      MaringScroll,
      TopTitle 
    },
    created() {
      this.getNewMv(); //获取mv信息
    },
    methods: {
      getNewMv() {
        clearTimeout(this.newMvTimer);
        if (this.countReduce) {
          this.countReduce--;
          getNewMv("", 9).then(res => {
            for (const item of res.data) {
              console.log(item)
              this.mvList.push({
                  id: item.id,
                  name: item.name,  // mv名称
                  cover: item.cover,  // mv封面
                  artistName: item.artistName,  // 创作者
                  playCount: toStringNum(item.playCount),  // 播放量
              })
            }
          }).catch(() => {
            this.newMvTimer = setTimeout(() => {
              this.getNewMv();
            }, 1000);
          })
        }
      }
    },
  }
</script>

<style scoped>
  .scroll-wrap {
    height: 150px;
    padding-top: 10px;
  }
    .item {
      width: 50vw;
      height: 130px;
      background: white;
      margin-left: 10px;
      border-radius: 10px;
      box-shadow: 1px 1px 10px rgb(135, 124, 124);
    }
      .img {
        width: 100%;
        height: 90px;
        overflow: hidden;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        position: relative;
      }
        .img img {
          width: 100%;
          height: 100%;
        }
        .img .icon {
          position: absolute;
          right: 5px;
          top: 3px;
          color: white;
          font-size: 14px;
        }
      .name {
        padding-top: 3px;
        text-align: center;
        font-size: 13px;
      }
      .artist {
        text-align: center;
        font-size: 12px;
        color: rgb(151, 151, 151);
      }
</style>