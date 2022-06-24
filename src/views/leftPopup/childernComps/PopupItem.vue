<template>
  <div class="popup-item">
    <div class="title" v-if="titleShow">
      {{title}}
    </div>
    <div class="content">
      <div v-for="(item, index) in itemList" :key="index" class="item">
        <img :src="item.icon" class="item-img" alt="">
        <div class="text">{{item.text}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PopupItem',
    props: {
      titleShow: {
        type: Boolean,
        default: () => true
      },
      itemList: {
        type: Array,
        default: () => []
      },
      title: {
        type: String,
        default: () => ''
      }
    }
  }
</script>

<style scoped>
  .popup-item {
    background-color: white;
    border-radius: 5px;
    margin-top: 10px;
  } 
    .title {
      color: #c5c5c5;
      font-size: 10px;
      border-bottom: 1px solid #e7e7e7;
      padding:5px 10px;
      line-height: 20px;
    }
    .content {
      font-size: 12px;
      padding: 0 10px;
    }
    .item {
      display: flex;
      height: 35px;
      line-height: 35px;
      font-size: 12.5px;
      letter-spacing: 2px;
    }
      .item-img {
        width: 20px;
        height: 20px;
        margin-right: 10px;
        margin-top: 7.5px;
      }

</style>