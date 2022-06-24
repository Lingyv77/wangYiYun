<template>
  <div class="anchor-info">
    <div class="top-box" v-if="data[0]">
      <div class="anchor-item" @click="toView(data[1].id, data[1])">
        <div class="rank" 
        :class="{ addRank: changeRank(data[1].changeRankCount) === 1, 
          reduceRank: changeRank(data[1].changeRankCount) === -1, 
          noChange: changeRank(data[1].changeRankCount) === 0}"> {{ data[1].rank }} </div>
        <div class="picture" :class="{ radiusHalf: radius }"> <img :src="data[1].picUrl" alt=""/> <img class="ico" src="~assets/imgs/radioStation/Ranking/play.png"/></div>
        <div class="name">{{ data[1].name }}</div>
        <div class="hot">{{ data[1].docs }}</div>
      </div>
      <div class="anchor-item" @click="toView(data[0].id, data[0])">
        <div class="rank scale bottom-add" 
        :class="{ addRank: changeRank(data[0].changeRankCount) === 1, 
          reduceRank: changeRank(data[0].changeRankCount) === -1, 
          noChange: changeRank(data[0].changeRankCount) === 0}"> {{ data[0].rank }} </div>
        <div class="picture scale top-add" :class="{ radiusHalf: radius }"> <img :src="data[0].picUrl" alt=""/> <img  class="ico" src="~assets/imgs/radioStation/Ranking/play.png"/></div>
        <div class="name">{{ data[0].name }}</div>
        <div class="hot">{{ data[0].docs }}</div>
      </div>
      <div class="anchor-item" @click="toView(data[2].id, data[2])">
        <div class="rank" 
        :class="{ addRank: changeRank(data[2].changeRankCount) === 1, 
          reduceRank: changeRank(data[2].changeRankCount) === -1, 
          noChange: changeRank(data[2].changeRankCount) === 0}"> {{ data[2].rank }} </div>
        <div class="picture" :class="{ radiusHalf: radius }"> <img :src="data[2].picUrl" alt=""/> <img  class="ico" src="~assets/imgs/radioStation/Ranking/play.png"/></div>
        <div class="name">{{ data[2].name }}</div>
        <div class="hot">{{ data[2].docs }}</div>
      </div>
    </div>
    <div class="user-info">
      <div class="info-rank" v-for="(item, index) in moreData" :key="index" @click="toView(item.id, item)">
        <div class="rank-count">
          <div class="ranking">
            {{ item.rank }}
          </div>
        <div class="change-ranking">
          <div class="rank-num" :class="{ 
               add: changeRank(item.changeRankCount) === 1,  
               reduce: changeRank(item.changeRankCount) === -1,
               new: changeRank(item.changeRankCount) === 3,}">
            {{ countAbs(item.changeRankCount) }} 
          </div>
        </div>
        </div>
        <div class="info-img" :class="{ radiusHalf: radius }"><img v-lazy="item.picUrl" alt=""> <img  class="ico" src="~assets/imgs/radioStation/Ranking/play.png"/></div>
        <div class="info-text">
          <div class="info-name"> {{ item.name }} </div>
          <span class="info-item" v-for="(bio, place) in item.infoList" :key="place"> {{ bio }} </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AnchorInfo',
    data() {
      return {
        moreData: []
      }
    },
    props: {
      data: { //数据
        type: Array,
        default: () => []
      },
      radius: { //圆角
        type: Boolean,
        default: () => false
      },
      play: { //播放件
        type: Boolean,
        default: () => false
      },
      path: {
        type: String,
        default: '/userInfo/'
      },
      songInfo: {
        type: Boolean,
        default: () => false
      }
    },
    created() {
      this.firstMoreData();
    },
    methods: {
      firstMoreData() {
        let timer = setInterval(() => { 
          if (this.data[0]) {
            this.moreData = this.data.slice(3);
            clearInterval(timer);
          }
        }, 10);
      },
      changeRank(rank) {
        if (Math.abs(rank) >= 80) {
          return 3
        }else if (rank > 0) {
            return 1
        }else if (rank < 0) {
          return -1
        }else {
          return 0
        }
      },
      countAbs(num) {
        if (!num) {
          return ''
        }else if (Math.abs(num) >= 80) {
          return ''
        }else {
          return Math.abs(num);
        }
      },
      toView(id, data) {
        if (id) {
          this.$store.state.playSong.path = '/PlaySaying/'; //跳转路由
          this.$router.push(this.path + id)
          .then(() => {
            this.$bus.$emit('sendSongData', data);
          })
        }
      }
    },
  }
</script>

<style scoped>
  .anchor-info {
    background-color: rgb(187, 187, 187);
    min-height: calc(100vh - 150px);
    margin-top: 50px;
    position: relative;
  }
    .top-box {
      width: 90vw;
      margin-left: 3vw;
      background-color: rgb(113, 113, 113);
      display: flex;
      transform: translateY(-20px);
      border-radius: 20px;
      color: rgb(245, 245, 245);
      padding: 1vw;
      box-sizing: content-box;
    }
      .scale {
        transform: scale(1.2);
      }
      .bottom-add {
        margin-top: -10px;
      }
      .top-add {
        margin-bottom: 10px;
        padding-top: 10px;
      }
      .anchor-item {
        flex: 1;
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
      }
        .rank {
          color: rgb(133, 24, 24);
          font-size: 1.2rem;
          font-weight: 600;
          position: relative;
          margin-bottom: 10px;
        }
        .addRank::before {
          display: block;
          content: " ";
          width: 0px;
          height: 0px;
          border: 5px solid transparent;
          border-bottom: 5px solid rgb(133, 24, 24);
          position: absolute;
          left: 50%;
          margin-left: -5px;
          bottom: -3px;
        }
        .noChange::before {
          display: block;
          content: " ";
          width: 16px;
          height: 4px;
          border-radius: 2px;
          background-color: rgb(143, 164, 182);
          position: absolute;
          left: 50%;
          margin-left: -8px;
          bottom: -3px;
        }
        .reduceRank::before {
          display: block;
          content: " ";
          width: 0px;
          height: 0px;
          border: 5px solid transparent;
          border-bottom: 5px solid rgb(80, 56, 157);
          position: absolute;
          left: 50%;
          margin-left: -5px;
          bottom: -3px;
        }
        .name {
          width: 30vw;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          word-break: break-all;
          font-size: 16px;
        }
        .hot {
          font-size: 13px;
          color: rgb(214, 219, 226);
        }
        .picture {
          position: relative;
        }
          .picture img{
            width: 75px;
            height: 75px;
            border-radius: 12px;
          }
          .picture .ico {
            position: absolute;
            width: 20px;
            height: 20px;
            opacity: 0.7;
            right: 22px;
            bottom: 8px;
          }
    .user-info {
      padding-bottom: 10px;
    }
      .info-rank {
        padding: 10px 0;
        display: flex;
        overflow: hidden;
      }
        .rank-count {
          flex:3;
          display: flex;
          justify-content: center;
          flex-direction: column;
        }
          .ranking {
            color: rgb(125, 122, 116);
          }
          .change-ranking {
            font-size: 12px;
            display: flex;
            justify-content: center;
          }
            .rank-num {
              display: flex;
            }
            .add {
              color:rgb(223, 37, 37);
            }
            .reduce {
              color: rgb(80, 56, 157);
            }
              .add::before {
                display: block;
                content: " ";
                width: 0px;
                height: 0px;
                border: 4px solid transparent;
                border-bottom: 4px solid rgb(223, 37, 37);
                margin: 2px;
              }
              .reduce::before {
                display: block;
                content: " ";
                width: 0px;
                height: 0px;
                border: 4px solid transparent;
                border-top: 4px solid  rgb(80, 56, 157);
                margin: 8px 2px;
              }
              .new::before {
                display: block;
                content: "NEW";
                font-size: 10px;
                font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
                color: rgb(113, 113, 57);
              }
        .info-img {
          flex: 5;
          position: relative;
        }
          .info-img img {
            width: 100%;
            border-radius: 12px;
          }
         .info-img .ico {
            position: absolute;
            width: 20px;
            height: 20px;
            opacity: 0.7;
            right: 7px;
            bottom: 10px;
          }
        .info-text {
          flex: 18;
          text-align: left;
          padding-left: 10px;
          color: rgb(140, 127, 127);
          font-size: 14px;
          margin: auto 0;
        }
          .info-name {
            color: rgb(95, 80, 80);
            font-size: 18px;
            margin-bottom: 5px;
            width: 63vw;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            word-break: break-all;
            font-size: 4.44444vw;
          }
          .info-item {
            margin-right: 20px;
          }
          .radiusHalf img {
            border-radius: 50%;
          }
</style>