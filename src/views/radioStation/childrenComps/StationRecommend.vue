<template>
  <div class="station-recommend" v-if="show">
    <div class="recommend-title">
      <div class="recommend-text" @click="toRouter(id)"> {{ name }} > </div>
    </div>
    <station-item :list="listItem" :showName="true"/>
  </div>
</template>

<script>
  import StationItem from './StationItem'

  import { getClassifyRecommend, getHotStation } from 'network/radioStation'

  export default {
    name: 'StationRecommend',
    components: { 
      StationItem
    },
    props: {
      id: {
        type: Number,
        default: 0,
      },
      name: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        listItem: [],
        show: true
      }
    },
    created() {
      this.getClassifyRecommend();
    },
    methods: {
      getClassifyRecommend() {
        getClassifyRecommend(this.id).then(res => {
          this.clickShow = res.hasMore; //点击加载数据是否状态展示
          let result = res.djRadios.slice(0,3);
          if (!result[0]) //是否展现
            this.show = false;
          for (let item of result) {
            this.listItem.push({
              id: item.id,
              picUrl: item.picUrl,
              name: item.name,
              rcmdText: item.rcmdtext,
              desc: item.desc,
            })
          }
        })
      },
      toRouter(){
        getHotStation(this.id, 30, 0).then(res => {
          if (res.hasMore) {
            this.$router.push('/classifyInfo/'+this.id);
          }else {
            this.$bus.$emit('stationRecommendHappenToast')
          }
        })
      }
    },
  }
</script>

<style scoped>
  .recommend-title {
    width: 100%;
    padding: 10px 15px;
  }
  .recommend-text {
    font-size: 17px;
    font-weight: 600;
    width: 25vw;
  }
</style>