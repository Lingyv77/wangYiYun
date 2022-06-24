<template>
  <div class="play-saying">
    <play-song v-if="show" :data="data" ref="play-song" :key="data.id">
      <template v-slot:conten>
        <div class="song-detail">
          <div class="blogger">
            <div class="title">来自博客</div>
            <div class="info-wrap">
              <div class="play-pic">
                <img :src="data.radio.picUrl" alt="">
              </div>
              <div class="info-conten">
                <div class="text-name"> {{ data.radio.name }} </div>
                <div class="min-font"> {{ data.radio.shareCount }}人分享 </div>
              </div>
              <div class="btn-ico">
                <div class="btn">♡收藏</div>
              </div>
            </div>
            <div class="bottom-text">
              最近更新时间: {{ data.radio.newTime }}
            </div>
          </div>
          <div class="blogger flex" @click="toUserInfo">
            <div class="user-pic">
              <img :src="data.pic" alt="">
            </div>
            <div class="info-conten">
              <div class="user-name"> {{ data.docs }} </div>
              <div class="min-font"> {{data.score}}热度</div>
            </div>
            <div class="btn-ico">
              <div class="btn-add">+关注</div>
            </div>
          </div>
          <div class="foot-text">
            <div class="bottom10">
              <span class="type"> {{ data.radio.category }} </span> <span class="text-saying"> {{ data.name }} </span> <span class="code"> Vol.{{ data.serialNum }} </span>
            </div>
            <div class="min-font bottom10">
              发布时间: {{ data.radio.releaseTime }}  播放量: {{ data.playCount }}
            </div>
            <div class="bottom-desc">
              {{ data.radio.bottomDesc }}
            </div>
          </div>
        </div>
      </template>
    </play-song>
  </div>
</template>

<script>
  import PlaySong from 'components/common/playSong/PlaySong'

  export default {
    name: 'PlaySaying',
    components: { PlaySong },
    data() {
      return {
        data: {},
        order: false,
        show: false,
      }
    },
    created() {
      this.firstGetSaying();
      this.$bus.$on('sendSongData', (res) => {
        this.show = true;
        this.setData(res);

        //管理数据更改
        this.$store.state.playSong.songName = res.name; //歌曲名称
        this.$store.state.playSong.singer = res.docs; //歌手
        this.$store.state.playSong.picUrl = res.picUrl; //歌曲页面
      });
    },
    methods: {
      firstGetSaying() {
        this.data.id = this.$route.params.id;
      },
      setData(data) {
        this.data = data;
      },
      toUserInfo() {
        this.$router.push('/userInfo/' + this.data.userId)
      }
    },
  }
</script>

<style scoped>
  .song-detail {
    height: 100%;
    overflow: scroll;
    padding: 20px 15px;
    color: rgb(218, 217, 217);
  }
  .song-detail::-webkit-scrollbar {
    width: 0;
  }
    .blogger {
      background-color: rgba(225, 225, 225, 0.1);
      box-shadow: 0 0  7px rgba(225, 225, 225, 0.15) inset;
      border-radius: 10px;
      padding: 10px;
      margin-bottom: 15px;
    }
      .info-wrap {
        padding: 10px 0;
        display: flex;
        border-bottom: 1px solid rgba(225, 225, 225, 0.15);
      }
        .play-pic {
          width: 60px;
          margin-right: 10px;
        }
          .play-pic img {
            width: 100%;
            border-radius: 10px;
            vertical-align: middle;
          }
        .info-conten {
          display: flex;
          width: 160px;
          flex-direction: column;
          justify-content: space-evenly;
        }
          .text-name {
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            word-break: break-all;
            width: 100%;
          }
          .min-font {
            color: rgb(154, 154, 154);
            font-size: 0.7rem;
          }
        .btn-ico {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }
          .btn {
            height: 30px;
            line-height: 30px;
            background-color: rgba(255, 255, 255, 0.6);
            color: rgba(0, 0, 0, 0.6);
            padding: 0 10px;
            border-radius: 18px;
            box-sizing: content-box;
          }
          .bottom-text{
            padding-top: 10px;
            font-size: 0.7rem;
            color: rgb(201, 201, 201);
          }
        .user-pic {
          width: 60px;
          margin-right: 10px;
        }
          .user-pic img {
            width: 100%;
            border-radius: 50%;
            vertical-align: middle;
          }
          .btn-add {
            height: 30px;
            line-height: 30px;
            color: rgba(255, 255, 255, 0.6);
            border: 1px solid rgba(225, 225, 225, 0.3);
            padding: 0 10px;
            border-radius: 18px;
            box-sizing: content-box;
          }
          .type {
            font-size: 0.6rem;
            border: 1px solid rgba(225, 225, 225, 0.5);
            padding: 2px 3px;
            border-radius: 2px;
          }
          .text-saying {
            font-size: 0.8rem;
            height: 25px;
            line-height: 25px;
          }
          .code {
            font-size: 0.83rem;
          }
          .bottom-desc {
            font-size: 0.8rem;
          }
      .bottom10 {
        margin-bottom: 10px;
      }
</style>