<template>
  <div class="song-hot">
    <anchor-info :song-info="true" :data="data" :play="true" :path="'/PlaySaying/'"/>
  </div>
</template>

<script>
  import AnchorInfo from 'components/content/anchorInfo/AnchorInfo'

  import { getSongHot } from 'network/radioStation'
  
  import { toStringNum } from 'common/common'

  export default {
    name: 'songHot',
    components: { AnchorInfo },
    data() {
      return {
        data: [],
        countReduce: 3, //准许初次加载次数
      }
    },
    created() {
      this.firstSongHot();
    },
    methods: {
      firstSongHot() {
        clearTimeout(this.hotTimer);
        if (this.countReduce) {
          this.countReduce--;
          getSongHot().then(res => {
            for (let item of res.toplist) {
              this.data.push({
                name: item.program.name, //名
                userId: item.program.dj.userId, //id
                picUrl: item.program.coverUrl, //图片
                pic: item.program.dj.avatarUrl, //用户图片
                rank: item.rank, //当前排名
                docs: item.program.dj.nickname,
                score: toStringNum(item.score), //热度
                infoList: ['热度 '+ toStringNum(item.score), item.program.dj.nickname], //热度
                changeRankCount: 100,//递增递减排名排名 范围区域显示new
                id: item.program.mainTrackId,
                playCount: toStringNum(item.program.listenerCount), //播放量
                serialNum: item.program.serialNum, //编号
                radio: { //播放信息
                  picUrl: item.program.radio.picUrl, //图片
                  name: item.program.radio.name, //名
                  desc: item.program.radio.desc, //详情
                  category: item.program.radio.category, //类别
                  shareCount: toStringNum(item.program.shareCount), //分享数
                  newTime: this.norm_time(item.program.radio.lastProgramCreateTime), //更新时间
                  releaseTime: this.norm_time(item.program.scheduledPublishTime), //发布时间
                  bottomDesc: item.program.description, //底部详情
                }
              })
            }
          }).catch(() => {
            this.anchorTimer = setTimeout(() => {
              this.firstSongHot();
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
      }
    }
  }
</script>

<style scoped>
  .song-ranking {
    background-color: rgb(255, 255, 255);
    min-height: calc(100vh - 144px);
    position: relative;
    padding-top: 20px;
  }
    .rank-nav {
      display: flex;
      justify-content: space-evenly;
    }
      .ranking-title {
        font-size: 1rem;
        padding: 0 15px;
        font-weight: 600;
        height: 30px;
        box-sizing: border-box;
        line-height: 30px;
        text-align: center;
      }
      .activeRanking { 
        color: rgb(255, 255, 255);
        background: rgb(113, 106, 106);
        border-radius: 15px;
      }
</style>