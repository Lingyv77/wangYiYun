<template>
  <div class="discover-program">
    <top-title :title="['精彩节目推荐','查看更多']" :path="'/radioStation'"/>
    <maring-scroll class="scroll-wrap">
      <div v-for="(item, index) in programList" :key="index" class="item" @click="toView(item.veId, item)">
        <div class="img">
          <img v-lazy="item.picUrl" alt=""/>
          <div class="play-ico">
            <img src="~assets/imgs/discover/SAItem/play.svg" alt="">
          </div>
        </div>
        <div class="text">
          <div class="name">{{item.name}}</div>
          <div class="desc">{{item.radio.desc}}</div>
        </div>
      </div>
    </maring-scroll>
  </div>
</template>

<script>
  import TopTitle from 'components/content/topTitle/TopTitle'
  import MaringScroll from 'components/common/marginScroll/MaringScroll'
  
  import { getProgram } from 'network/discover'

  import { toStringNum } from 'common/common'

  export default {
    name: "DiscoverProgram",
    data() {
      return {
        programList: [],
        countReduce: 3, //准许初次加载次数
      }
    },
    components: {
      TopTitle,
      MaringScroll,
    },
    created() {
      this.getProgram();
    },
    methods: {
      getProgram() {
        clearTimeout(this.programTimer);
        if (this.countReduce) {
          this.countReduce--;
          getProgram().then(res => {
            for (const item of res.programs) {
              this.programList.push({
                picUrl: item.coverUrl,  // 封面
                veId: item.id,  // id
                userId: item.dj.userId, //用户id
                name: item.name,  // 标题
                desc: item.radio.desc,  // 介绍
                pic: item.dj.avatarUrl, //用户图片
                rank: item.rank, //当前排名
                docs: item.dj.nickname, //用户名
                score: toStringNum(item.score), //热度
                infoList: ['热度 '+ toStringNum(item.score), item.dj.nickname], //热度
                changeRankCount: 100,//递增递减排名排名 范围区域显示new
                id: item.mainTrackId,
                playCount: toStringNum(item.listenerCount), //播放量
                serialNum: item.serialNum, //编号
                radio: { //播放信息
                  picUrl: item.radio.picUrl, //图片
                  name: item.radio.name, //名
                  desc: item.radio.desc, //详情
                  category: item.radio.category, //类别
                  shareCount: toStringNum(item.shareCount), //分享数
                  newTime: this.norm_time(item.radio.lastProgramCreateTime), //更新时间
                  releaseTime: this.norm_time(item.scheduledPublishTime), //发布时间
                  bottomDesc: item.description, //底部详情
                }
              })
            }
         }).catch(() => {
            this.programTimer = setTimeout(() => {
              this.getProgram();
            }, 3000);
         })
        }
      },
      norm_time(date) {
        let time = new Date(date);
        let year = time.getFullYear();
        let month = this.count_change(time.getMonth() + 1);
        let day = this.count_change(time.getDate());
        return `${year}-${month}-${day}`;
      },
      count_change(num) {
        if (num < 10) 
          return '0' + num;
        else 
          return num;
      },
      toView(id, data) {
        if (id) {
          this.$store.state.playSong.path = '/PlaySaying/'; //跳转路由
          this.$router.push('/PlaySaying/'+ id)
          .then(() => {
            this.$bus.$emit('sendSongData', data);
          })
        }
      }
    },
  }
</script>

<style scoped>
  .scroll-wrap {
    height: 140px;
  } 
    .item {
      height: auto;
      width: 33.333vw;
      padding: 0 10px;
    }
      .img {
        width: 100px;
        height: 100px;
        position: relative;
        border-radius: 5px;
        overflow: hidden;
        background-color: rgba(0,0,0,0.3);
      }
        .img img {
          width: 100%;
          height: 100%;
        }
        .img .play-ico {
          right: 5px;
          bottom: 5px;
          width: 25px;
          height: 25px;
          border-radius: 50%;
          background-color: rgba(225,225,225,0.5);
          position: absolute;
          display: flex;
          justify-content: center;
        }
          .img .play-ico img {
            width: 20px;
            height: 20px;
            margin-top: 2.5px;
          }
    .text {
      height: 35px;
    }
      .name {
        font-size: 14px;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: break-all;
        overflow: hidden;
      }
      .desc {
        font-size: 12px;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: break-all;
        overflow: hidden;
        color: rgb(121, 119, 119);
      }
</style>