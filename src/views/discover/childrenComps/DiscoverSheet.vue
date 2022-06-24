<template>
  <div class="discover-sheet">
    <top-title :title='["懂你的精选歌单","查看更多"]' :path="path"/>
    <maring-scroll class="discover-wrap">
      <div v-for="(item, index) in sheetList" :key="index" class="item" @click="toSheet(item.id)">
        <sheet-item :img-url="item.picUrl" :play-count="item.playCount"/>
        <p class="rcmdtext">{{ item.rcmdtext }}</p>
      </div>
    </maring-scroll>
  </div>
</template>

<script>
  import TopTitle from 'components/content/topTitle/TopTitle.vue'
  import MaringScroll from 'components/common/marginScroll/MaringScroll'
  import SheetItem from 'components/content/sheetItem/SheetItem'

  import { toStringNum } from 'common/common' 
  import { getHotSheet } from 'network/discover' 

  export default {
    name: "DiscoverSheet",
    data() {
      return {
        sheetList: [],
        offset: -1,
        path: '/discover/moreSheet',
        countReduce: 3, //准许初次加载次数
      }
    },
    components: { 
      TopTitle,
      MaringScroll,
      SheetItem
    },
    created() {
      this.getHotSheet();
    },
    methods: {
      getHotSheet() {
        clearTimeout(this.HotSheetTimer);
        if (this.countReduce) {
          this.countReduce--;
          getHotSheet("hot", "全部", 6, this.offset * 6).then(res => {
            for (const item of res.playlists) {
              this.sheetList.push({
                id: item.id,
                rcmdtext: item.name,
                desc: item.description,
                picUrl: item.coverImgUrl,
                playCount: toStringNum(item.playCount) + '',
              })
            }
          }).catch(() => {
            this.HotSheetTimer = setTimeout(() => {
              this.getHotSheet();
            }, 1000);
          })
        }
      },
      toSheet(id) {
        this.$router.push(`/playDetail/${id}&false`);
      },
      
    },
  }
</script>

<style scoped>
  .discover-wrap {
    height: 150px;
  }
    .item {
      width: 33.3333vw;
      height: 150px;
      text-align: center;
      padding: 10px;
    }
      .rcmdtext {
        margin-top: 5px;
        width: 100px;
        height: 30px;
        overflow: hidden;
        font-size: 12px;
        line-height: 15px;
      }
</style>