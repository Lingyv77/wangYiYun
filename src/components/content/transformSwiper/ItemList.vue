<template>
  <div class="face">
    <div v-for="(item, index) in musicMessage" :key="index" class="item" @click="plsySongClick(item)">
      <div class="img">
        <img v-lazy="item.picUrl" class="img" alt=""/>
      </div>
      <div class="desc">
        <div class="music-name">
         {{ item.name }}
        </div>
        <div class="singer-name">        
          <span v-for="(list, index) in item.artists" :key="index">
            {{list.name}}
          </span>
        </div>
      </div>
      <div class="btn-contetn">
        <div class="btn">
          <img src="~assets/imgs/discover/SAItem/play.svg" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ItemList",
    props: {
      musicMessage: {
        type: Array,
        default() {
          return []
        }
      },
      useSong: {
        type: Number,
        default: 1
      }
    },
    methods: {
      plsySongClick(item) {
        if (!this.useSong) {
          this.$router.push('/PlayMusic/' + item.id);
        }
      }
    },
  }
</script>

<style scoped>
    .item {
      flex: 1;
      display: flex;
      margin-top: 6px;
    }
      .img {
        width: 45px;
        height: 45px;
      }
        .img img {
        width: 45px;
        height: 45px;
          border-radius: 5px;
        }
      .desc {
        height: 100%;
        flex: 1;
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }
        .music-name {
          flex: 5;
          font-size: 14px;
        }
        .singer-name {
          flex: 6;
          font-size: 12.5px;
          color: #8b8b8b;
        }
        .music-name, .singer-name {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          word-break: break-all;
        }
      .btn-contetn {
        width: 30px;
        height: 45px;
        display: flex;
        justify-content: center;
      }
        .btn {
          margin-top: 6px;
          width: 30px;
          height: 30px;
          text-align: center;
          border: 1px solid rgb(211, 73, 73);
          border-radius: 50%;
        }
          .btn img {
            margin-top: 5px;
            width: 20px;
            height: 20px;
          }
</style>