<template>
  <div class="station-list flex">
    <div class="station-item" v-for="(item, index) in list" :key="index" @click="toRouter(item.id)">
      <div class="station-box">
        <div class="show-pay" v-if="showPay"> 付费精品 </div>
        <img v-lazy="item.picUrl" alt="" class="station-img">
        <div class="name" v-if="showName"> {{ item.name }} </div>
      </div>
      <div class="title"> {{ item.rcmdText == "" ? item.desc : item.rcmdText }} </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StationItem",
  props: {
    list: {
      type: Array,
      default: () => []
    },
    showPay: {
      type: Boolean,
      default: false
    },
    showName: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toRouter(id) {
      if (id) {
        this.$router.push('/stationDetail/'+id);
      }
    }
  },
}
</script>

<style scoped>
  .station-list {
    padding: 0 5px;
  }
  .station-item {
    flex: 1;
  }
    .station-box {
      margin: 0 auto;
      width: 30vw;
      height: 30vw;
      position: relative;
      border-radius: 7px;
      overflow: hidden;
    }
      .show-pay {
        width: 60px;
        height: 20px;
        padding: 2px 3px;
        text-align: center;
        position: absolute;
        left: 0;
        top: 0;
        font-size: 12px;
        background-color: rgb(213, 48, 48);
        color: white;
        border-radius: 3px;
      }
      .station-img {
        width: 100%;
        height: 100%;
      }
      .name {
        position: absolute;
        width: 100%;
        bottom: 0;
        text-align: center;
        padding: 5px;
        font-size: 13px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
        color: white;
      }
      .title {
        margin-top: 5px;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: 14px;
        margin: 0 auto;
        width: 30vw;
        text-align: center;
        color: rgb(35, 27, 27);
      }
</style>