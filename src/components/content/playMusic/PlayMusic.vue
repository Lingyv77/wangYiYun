<template>
  <div class="play-music">
    <play-song :data="data">
      <template v-slot:conten>
        <div class="lyirc" ref="lyircContent">
          <div class="wrie" ref="wrie" :style="{ borderTopColor: $store.state.lyirc.lyircColor }">
            <div class="small-org" :style=" { color: $store.state.lyirc.lyircColor }">♬</div>
          </div>
          <div v-if="data.showLyirc" class="hasLyirc" ref="warpList" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
            <div v-for="(item, index) in data.lyircList" :key="index" class="lyirc-item" :style="{color: item.textColor ? $store.state.lyirc.lyircColor : 'white'}">
              <div class="lyirc-text"> {{ item.lyirc }} </div>
              <div class="lyircChinese"> {{ item.lyircChinese }} </div>
            </div>
          </div>
          <div v-else class="notLyirc">
            无歌词
          </div>
        </div>
      </template>
    </play-song>
  </div>
</template>

<script>
  import PlaySong from 'components/common/playSong/PlaySong';

  import { getSongDetail } from 'network/played' //获取歌曲基本信息
  import { getlyric } from 'network/playSong' //获取音乐url 歌词 评论

  export default {
    name: 'PlayMusic',
    components: { PlaySong },
    computed: {
      playImg: {
        get(){
          return this.$store.state.playSong.playNow;
        },
        set(value){
          this.$store.state.playSong.playNow = value;
        }
      }
    },
    data() {
      return {
        data: {
          singerName: '', //歌手
          songName: '', //歌曲名称
          picUrl:  require('assets/lazyload/doing.gif'),
          showLyirc: false, 
          lyircList: [], //歌词
        },
        startPosition: 0, //start y轴位置
        distance: 0, //滑动距离
        resultDistance: 0, //最终距离
        tansfromTimer: 500, //歌词该位放下过渡时间
        countReduce: 3, //准许初次加载次数
      }
    },
    created() {
      this.firstGetSongDetail(); //获取歌曲信息
      this.lyircTimerStart(); //歌词监听更改样式
    },
    unmounted() {
      this.lyircTimerStop();
    },
    methods: {
      firstGetSongDetail() {
        clearTimeout(this.songMessage);
        if (this.countReduce) {
          this.countReduce--;
          getSongDetail(this.$route.params.id).then(res => { //获取歌曲信息
            let result = res.songs[0];
            this.data.id = result.id; //歌曲id
            this.data.singerName = result.ar[0].name; //歌手
            this.data.songName = result.name; //歌曲名称
            this.data.picUrl = result.al.picUrl; // 歌曲封面

            //管理数据更改
            this.$store.state.playSong.path = '/PlayMusic/'; //跳转路由
            this.$store.state.playSong.songName = result.name; //歌曲名称
            this.$store.state.playSong.singer = result.ar[0].name; //歌手
            this.$store.state.playSong.picUrl = result.al.picUrl; //歌曲页面

            this.firstGetLyric(); //评论
          })
          .catch(() => {
            this.songMessage = setTimeout(() => {
              this.firstGetSongDetail();
            }, 3000);
          })
        }
      },
      /**
       * 请求获取歌词
       */
      firstGetLyric() { 
        getlyric(this.$route.params.id).then(res => {
          if (!res.nolyric) {
            let reg = /\[([0-9]+):([0-9]+)\.([0-9]+)\]/g;
            let lyric = /\[.*\](.*)/g;
            let lyricTime = Array.from(res.lrc.lyric.matchAll(reg)).map(x => { //时间秒单位获取
              let num1 = (Number(x[1]) * 60); //分转换秒
              let num2 = Number(x[2]); //秒
              let num3 = Number('0.'+x[3])//秒小数单位
              let value = num1 + num2 + num3;
              return value;
            });
            let listLyric = Array.from(res.lrc.lyric.matchAll(lyric)).map(x => x[1]); //歌词获取
            let lyricChinese = '';
            if (listLyric.length < 2) 
              this.data.showLyirc = false; //歌词显示
            else 
              this.data.showLyirc = true;
            if (res.tlyric) {
              lyricChinese = Array.from(res.tlyric.lyric.matchAll(lyric)).map(x => x[1]); //翻译歌词获取
            }
            for (let i = 0; i < listLyric.length; i++) {
              this.data.lyircList.push({
                lyricTime: lyricTime[i], //歌曲起步时间
                lyirc: listLyric[i], //歌词
                lyircChinese: lyricChinese[i], //翻译歌词
                textColor: false,
                index: i
              })
            }
          }
        })
      },
      /**
       * 歌词色, top变
       */
      lyircTimerStart() {
        clearInterval(this.lyircTimer);
        this.lyircTimer = setInterval(() => {
          if (this.data.showLyirc) {
            this.strColor(); //歌词阶段颜色
          }
        }, 1000);
      },
      /**
       * 停止歌词自动变色 top
       */
      lyircTimerStop(){ 
        clearInterval(this.lyircTimer);
      },
      strColor() {
        let warpList = this.$refs.warpList;
        this.data.lyircList.forEach(item => {
          if (item.lyricTime <= this.$store.state.navMusicDom.currentTime) {
            item.textColor = true;
            if (warpList.children[item.index].offsetTop - 160 >= 0) {
              let positionTop = -(warpList.children[item.index].offsetTop - 160);
              this.transformTop(positionTop);
              this.resultDistance = positionTop;
            }else {
              this.transformTop(0)
            }
          }else {
            item.textColor = false;
          }
        })
      },
      transformTop(position) {
        let warpList = this.$refs.warpList;
        warpList.style.transform = `translateY(${ position }px)`;
      },
      touchStart(e) {
        this.lyircTimerStop(); //停止歌词监听
        clearTimeout(this.lyricTimeOut); //关闭tocuhend延迟执行定时器
        this.$refs.wrie.style.opacity = '1';
        this.$refs.warpList.style.transition =  '0ms';

        this.startPosition = e.touches[0].pageY;
      },
      touchMove(e) {
        let warpList = this.$refs.warpList;
        this.distance =  e.touches[0].pageY - this.startPosition;

        this.position = this.resultDistance + this.distance;

        if (this.position <= 0 && -this.position <= warpList.children[warpList.childElementCount - 1].offsetTop - 160) {
          this.transformTop(this.position);
        }
        
      },
      touchEnd() {
        this.$refs.wrie.style.opacity = '0';
        let differences = this.$refs.lyircContent.offsetHeight / 2; //wrie 所在差值位
        
        let warpList = this.$refs.warpList;
        this.resultDistance += this.distance;
        if (this.position > 0) {
          this.resultDistance = 0;
          this.transformTop(0);
        }
        if (-this.position > warpList.children[warpList.childElementCount - 1].offsetTop - 160) {
          this.resultDistance = -(warpList.children[warpList.childElementCount - 1].offsetTop - 160);
          this.transformTop(-(warpList.children[warpList.childElementCount - 1].offsetTop - 160));
        }

        let wripePosition = this.resultDistance - differences; //wrie 所在位置


        warpList.style.transition = this.tansfromTimer + 'ms';
        this.lyricTimeOut = setTimeout(() => {
          this.lyircTimerStart(); //开始歌词监听
          this.$store.state.playSong.playNow = true; //播放音乐
          this.data.lyircList.forEach(item => {
            item.textColor = false;
            if (-(wripePosition) > warpList.children[item.index].offsetTop) {
              if (!this.showlogo) {
                this.$store.state.navMusicDom.currentTime = item.lyricTime;
              }
              item.textColor = true;
              let positionTop = -(warpList.children[item.index].offsetTop - 160);
              this.transformTop(positionTop);
              this.resultDistance = positionTop;
            }
          })
        }, 500);
      },
    },
    watch: {
      playImg() {
        if (this.playImg) {
          this.lyircTimerStart();
        }else {
          this.lyircTimerStop();
        }
      },
    }
  }
</script>

<style scoped>
.lyirc {
  height: 100%;
  padding: 10px 0;
  color: white;
  text-align: center;
  overflow: hidden;
  position: relative;
}
  .wrie {
    position: absolute;
    width: 80vw;
    left: 10vw;
    top: 50%;
    height: 2px;
    transition: all 1s;
    border-top-style: dashed;
    border-top-width: 2px;
    opacity: 0;
  }
    .small-org {
      font-size: 10px;
      position: absolute;
      right: -15px;
      bottom: -4px;
    }
  .hasLyirc {
    width: 100%;
    height: auto;
    transition: all 0.5s;
    padding-top: 200px;
  }
  .hasLyirc::-webkit-scrollbar {
    width: 0;
  }
  .notLyirc {
    width: 80px;
    height: 30px;
    line-height: 30px;
    border-radius: 5px;
    border: 1px solid white;
    position: absolute;
    margin-top: calc(50% + 15px);
    margin-left: calc(50% - 40px);
  }
    .lyirc-item {
      padding: 0 30px;
      padding-bottom: 20px;
      transition: color 0.5s;
    }
</style>