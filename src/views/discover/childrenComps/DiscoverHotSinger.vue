<template>
  <div class="discover-hot-singer">
    <top-title :title="['热门歌手','查看更多']"/>
    <div class="singer-message">
      <div v-for="(item, index) in singerList" 
           :key="index" 
           class="item"
           @click="toUserInfo(item.userId)">
        <div class="img">
          <img v-lazy="item.picUrl" alt=""/>
          <div class="icon">
            <img src="~assets/imgs/information/wyy.svg" alt="">
          </div>
        </div>
        <div class="text">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import TopTitle from 'components/content/topTitle/TopTitle'

  import { getHotSinger } from 'network/discover'

  export default {
    name: "DiscoverHotSinger",
    data() {
      return {
        singerList: [],
        countReduce: 3, //准许初次加载次数
      }
    },
    components: { TopTitle },
    created() {
      this.getHotSinger();
    },
    methods: {
      getHotSinger() {
        clearTimeout(this.hotTimer);
          if (this.countReduce) {
            this.countReduce--;
          getHotSinger(9, 0).then(res => {
            for (const item of res.artists) {
              this.singerList.push({
                userId: item.accountId,
                name: item.name,
                picUrl: item.img1v1Url,
              });
            }
          }).catch(() => {
            this.hotTimer = setTimeout(() => {
              this.getHotSinger();
            }, 1000);
          })
        }
      },
      toUserInfo(id) {
        if(id) {
          this.$router.push('/userInfo/'+id);
        }
      }
    },
  }
</script>

<style scoped>
  .discover-hot-singer {
    width: 100vw;
    min-height: 20px;
    margin-bottom: 20px;
  }
    .singer-message {
      display: flex;
      flex-wrap: wrap;
    }
      .item {
        width: 30vw;
        background-color: white;
        color: black;
        border-radius: 10px;
        margin-left: 2.5vw;
        margin-top: 2.5vw;
        box-shadow: 1px 1px 8px rgba(206, 199, 199, 0.7);
      }
        .img {
          width: 80px;
          height: 80px;
          margin: 8px 14px;
          border-radius: 50%;
          background-color: rgb(255, 255, 255,0.2);
          position: relative;
        }
          .img img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        .icon {
          width: 20px;
          height: 20px;
          background: linear-gradient(35deg, transparent , rgba(250, 2, 2, 0.3) 30%, transparent);
          border-radius: 50%;
          position: absolute;
          display: flex;
          justify-content: center;
          right: 0;
          bottom: 0;
        }
          .icon img {
            width: 15px;
            height: 15px;
            margin-top: 2.5px;
          }
        .text {
          margin-bottom: 8px;
          text-align: center;
          font-size: 16px;
        }
</style>