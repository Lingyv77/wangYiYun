<template>
  <div class="classify-list">
    <div class="classify-info-item flex" v-for="(item, index) in list" :key="index">
      <div class="pic">
        <div class="pic-name" v-if="item.price"> 付款精品 </div>
        <img class="pic-img" v-lazy="item.picUrl" alt="">
      </div>
      <div class="text-info">
        <div class="info-name"> {{ item.name }} </div>
        <p> {{ item.rcmdText ?  item.rcmdText : item.desc}} </p>
        <p> 节目: {{ item.counter }}, {{ item.subCount > 500 ? '订阅:' +item.subCount : '最新上架' }} </p>
        <div class="price" v-if="item.price"> ￥ {{ item.price/100 }} </div>
      </div>
    </div>
  </div> 
</template>

<script>
  export default {
    name: 'ClassifyInfoItem',
    props: {
      list: {
        type: Array,
        defalut: () => []
      }
    }
  }
</script>

<style scoped>
  .classify-info-item {
    margin: 10px 0;
    padding: 0 10px;
  }
    .pic {
      width: 100px;
      height: 100px;
      position: relative;
      border-radius: 6px;
      overflow: hidden;
    }
      .pic-name {
        background-color: rgb(235, 48, 48);
        color: white;
        text-align: center;
        padding: 2px 5px;
        border-radius: 3px;
        position: absolute;
        font-size: 10px;
        left: 0;
        top: 0;
      }
      .pic-img {
        width: 100%;
        height: 100%;
      }
    .text-info {
      flex: 1;
      padding-left: 10px;
      display: flex;
      flex-direction: column;
    }
      .info-name {
        font-size: 16px;
        font-weight: 600;
        height: 30px;
        line-height: 30px;
        width: 200px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
      }
      .text-info p {
        color: rgb(172, 172, 172);
        font-size: 12px;
        flex: 1;
        display: flex;
        justify-content: center;
        flex-direction: column;
        width: 230px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
      }
      .price {
        font-size: 14px;
        color: rgb(241, 33, 33);
        margin-top: 8px;
      }
</style>