<template>
  <div  class="my-message" @scroll="onScroll" @touchmove="touchMove" @touchend="touchEnd">
      <div class="bg-top" ref="bgTop">
        <div class="bg-cover" ref="bgCover">
          <div >
            <img ref="bgImg" :src="data.bgimg" alt="">
          </div>
        </div>
      </div>
      <div class="content">
        <div class="user-detail">
          <div class="detail-img"><img :src="data.picUrl" alt=""></div>
          <div class="user-name"> {{ name }} </div>
          <div class="text-desc">
            <div class="desc-num">
              <div class="add-num"> {{ data.follows }} 关注</div>
              <div class="fan-num"> {{ fanCount }} 粉丝</div>
              <div class="vl-num">Lv.{{ data.level }} </div>
            </div>
            <div class="info-list">
              <div v-for="(item, index) in infoList" :key="index" class="item"> {{ item }} </div>
            </div>
            <div class="bottom-text">
              <div class="btn-add" @click="setProfile">编辑资料</div> <div class="show-fan-list">∨</div>
            </div>
          </div>
        </div>
        <div class="basic-info-box">
          <div class="basic-title"> 基本信息 </div>
          <div class="info-item" v-if="showHonor">
            <div class="info-ico"><img :src="data.honor.picUrl" alt=""></div>
            <div class="info-honor-name"> {{ data.honor.name }} ></div>
          </div>
          <div v-for="(item, index) in data.infoList" :key="index" class="info-item">
            <div class="item-key">  {{ item.key }}: </div>
            <div class="item-value">  {{ item.value }} </div>
          </div>
        </div>
        <div class="basic-info-box">
          <div class="basic-title"> 音乐品味 </div>
          <div class="listen-item">
            <div class="song-title-img">
              <img :src="data.palyPicUrl" alt="">
            </div>
            <div class="listen-desc-text">
              <div class="song-title">听歌排行</div>
              <div class="desc-text">累计听歌{{ data.songlistCount }}首</div>
            </div>
          </div>
          <div class="listen-item">
            <div class="song-title-img">
              <img :src="data.palyPicUrl" alt="">
            </div>
            <div class="listen-desc-text">
              <div class="song-title">我喜欢的音乐</div>
              <div class="desc-text">{{ data.trackCount }}首, 播放{{ data.playCount }}首</div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>

  import { getUserInfo, getListSong } from 'network/myMessage'

  import { toStringNum } from 'common/common'

  export default {
    name: 'MyMessage',
    data() {
      return {
        data: { //初始值
          picUrl: require('assets/imgs/myMessage/picture.png'),
          palyPicUrl: require('assets/imgs/myMessage/music-ico.png'),
          bgimg: require('assets/imgs/myMessage/bg.png'),
          songlistCount: '--',
          playCount: '--',
        },
        infoList: ['村龄0天', '江西赣州'],
        countReduce: 3, //准许初次加载次数
        countReduceTwo: 3, //准许初次加载次数
        scaleState: true, 
        longOne: true, //一次执行
        setRatio: [1.5, 1], //缩放比例范围
        showHonor: false
      }
    },
    activated() {
      this.firstGetUserInfo();
    },
    computed: {
      fanCount() {
        return toStringNum(this.data.fanCount); //粉丝数
      },
      name: {
        get() {
          return this.$store.state.userData.name;
        },
        set(value) {
          this.$store.state.userData.name = value;
        }
      }
    },
    methods: {
      firstGetUserInfo() {
        if (this.$store.state.userData.id) {
          getUserInfo(this.$store.state.userData.id).then(res => {
            this.data = {
              name: res.profile.nickname, //名字
              bgimg: res.profile.backgroundUrl, //背景图片
              picUrl: res.profile.avatarUrl, //头像图片
              fanCount: res.profile.followeds, //粉丝数量
              follows: res.profile.follows, //关注数量
              level: res.level, //用户等级
              songlistCount: res.listenSongs,
              createDays: new Date(res.createDays).getDate(),
              infoList: [
                { key: '村龄',
                  value: res.createTime === -1 ? `注册${res.createDays}天` : `${Math.trunc(res.createDays / 365)}年 (${new Date(res.createTime).getFullYear()}年${new Date(res.createTime).getMonth() + 1}月注册)`
                },
                {
                  key: '个人简介',
                  value: res.profile.signature.length ? res.profile.signature : '音人较懒没有简介~',
                }
              ],
            }
            if (res.identify) {
              this.data.honor = {
                name: res.identify.imageDesc,
                picUrl: res.identify.imageUrl
              }
              this.showHonor = true
            }
            // this.data {
            //   // textDesc: res.identify.imageDesc || '', //音乐达人称号
            //   // imgaeDesc: res.identify.imageUrl || '', //音乐达人称号等级img
            //   // actionUrl: res.identify.actionUrl || '#', //音乐达人介绍链接
            //   // farmerText: res.profileVillageInfo.title || '', //村民证
            //   // farmerImg: res.profileVillageInfo.targetUrl || '', //村民证图片
            //   // farmerUrl: res.profileVillageInfo.imageUrl || '#', //村民证链接
            // }
            this.firstGetListSong();
          }).then(() => {
            this.infoList[0] = `村龄${this.data.createDays}天`;
          })
        }
      },
      /**
       * 编辑资料view
       */
      setProfile() {
        // if (this.$store.state.userData.state) {
          this.$router.push('/SetProfile');
        // }
      },
      firstGetListSong() {
        clearInterval(this.songListTimer)
        if (this.countReduceTwo) {
          this.countReduceTwo--;
          getListSong(this.$store.state.userData.id).then(res => {
            this.data.trackCount = res.playlist[0].trackCount; //喜欢数量
            this.data.playCount = res.playlist[0].playCount; //播放数量
            this.data.palyPicUrl =   res.playlist[0].coverImgUrl ; //播放信息头像
          }).catch(() => {
            this.songListTimer = setTimeout(() => {
              this.firstGetListSong();
            }, 3000);
          })
        }
      },
      onScroll(event) {
        if ((event.srcElement.scrollTop / this.$refs.bgTop.offsetHeight) >= 0.8) {
          this.$refs.bgCover.style.backgroundColor = 'rgb(25,25,25)';
        }else {
          this.$refs.bgCover.style.backgroundColor = `rgba(25,25,25,${((event.srcElement.scrollTop / this.$refs.bgTop.offsetHeight)*100 +10 ) /100 })`;
        }
      },
      touchMove(e) {
        if (!this.$el.scrollTop) {
          if (this.scaleState) {
            this.startPositionY = e.touches[0].pageY;
            this.changePageY = this.startPositionY;
            if(this.longOne) {
              this.earlyHeight = this.$refs.bgTop.offsetHeight;
              this.longOne = false;
            }
            this.scaleState = false; //一次结束
          }

          let start = +this.changePageY; //存储上次值
          this.changePageY = e.touches[0].pageY; //变动上次值
          let diffDistance;
          if (start > this.changePageY) { //上滑
            this.startPositionY = start;
            diffDistance = start - e.touches[0].pageY; //差距
            this.changHeight -= diffDistance;
          }else { //下滑
            diffDistance = e.touches[0].pageY - this.startPositionY; //差距
            this.changHeight = diffDistance + this.earlyHeight;
          }
          
          this.$refs.bgImg.style.transition = 'none';
          this.$refs.bgTop.style.transition = 'none';

          if ((this.changHeight) >= (this.earlyHeight * this.setRatio[0])) {
            this.changHeight = this.earlyHeight * this.setRatio[0];
          }else if (this.changHeight <= this.earlyHeight) {
            this.changHeight = this.earlyHeight;
          }

          this.ratio = (this.changHeight) / this.earlyHeight; //比例
          if ((this.ratio <= this.setRatio[0] && this.ratio >= this.setRatio[1]) || (this.ratio >= this.setRatio[1] && this.ratio <= this.setRatio[0])) {
            this.$refs.bgImg.style.transform = `scale(${this.ratio})`;
            this.$refs.bgTop.style.height = (this.earlyHeight * this.ratio)+'px';
          }
        }
      },
      touchEnd() {
        if (!this.scaleState) {
          this.$refs.bgImg.style.transition = 'transform 0.2s'
          this.$refs.bgTop.style.transition = 'height 0.2s'
          this.$refs.bgImg.style.transform = 'scale(1)';
          this.$refs.bgTop.style.height = this.earlyHeight+'px';
          this.scaleState = true;
        }
      }
    },
    watch: {
      storeName() {
        this.data.name = this.$store.state.userData.name;
        console.log('--')
      }
    }
  }
</script>

<style scoped>
  .my-message {
    background-color: rgb(7, 7, 7);
    width: 100vw;
    height: calc(100vh - 56px);
    position: relative;
    z-index: 8;
    color: white;
    overflow: hidden;
    overflow-y: scroll;
  }
  .my-message::-webkit-scrollbar {
    width: 0;
  }
    .top-bar {
      position: fixed;
      top: 0%;
      width: 100%;
      left: 0;
      z-index: 4;
    }
    .bg-top {
      position: relative;
      z-index: 1;
      height: 270px;
      overflow: hidden;
    }
      .bg-cover {
        width: 100%;
        height: 103%;
        background-color: rgba(25, 25, 25, 0.1);
        position: absolute;
        z-index: 2;
      }
      .bg-top img {
        width: 100%;
        position: absolute;
        z-index: 1;
      }
      .to-back, .ritht-set {
        font-size: 24px;
      }
      .name {
        text-align: left;
      }
    .content {
      background-color: rgb(7, 7, 7);
      width: 100%;
      position: relative;
      z-index: 3;
      box-shadow: 0 0 30px 20px rgb(7, 7, 7) ;
      padding: 110px 15px 30px;
    }
      .user-detail {
        height: 80px;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        width: 92vw;
        top: -40px;
        height: 150px;
        background: linear-gradient(to bottom, rgba(157, 132, 132, 0.5), rgb(7, 7, 7));
        border-radius: 10px;
      }
        .detail-img {
          flex: 1;
          display: flex;
          align-items: flex-end;
          margin-top: -40px;
        }
        .user-name {
          padding: 5px 0;
        }
          .detail-img img {
            width: 75px;
            height: 75px;
            border-radius: 50%;
            vertical-align: middle;
          }
        .text-desc {
          flex: 6;
        }
            .desc-num {
              display: flex;
              justify-content: center;
            }
              .desc-num > div {
                text-align: center;
                margin: 0 6px;
                font-size: 14px;
              }
               .font-m {
                 font-size: 10px;
                 color: rgb(211, 207, 207);
               }
            .info-list {
              display: flex;
              justify-content: center;
              align-items: center;
              margin-top: 10px;
              color: rgb(113, 113, 113);
              font-size: 12px;
            }
              .info-list .item {
                margin: 0 3px;
                background-color: rgba(41, 41, 41, 0.5);
                padding: 2px 5px;
                border-radius: 5px;
                box-shadow: 0 0 3px 1px rgba(47, 47, 47, 0.5) inset;
              }
            .bottom-text {
              display: flex;
              width: 100%;
              bottom: 0;
              margin-top: 10px;
              align-items: center;
              justify-content: center;
            }
            .btn-add {
              width: 120px;
              height: 25px;
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 13px;
              margin-right: 10px;
              border: rgb(84, 83, 83) 1px solid;
              letter-spacing: 3px;
              padding-left: 6px;
            }
            .show-fan-list {
              width: 25px;
              height: 25px;
              border-radius: 50%;
              display: flex;
              justify-content: center;
              align-items: center;
              border: 1px solid rgb(84, 83, 83);
              box-sizing: content-box;
              margin-top: -2px;
            }
      .basic-info-box {
        margin-top: 20px;
        border-radius: 10px;
        width: 100%;
        background-color: rgb(27, 25, 25);
        box-shadow: 0 0 10px rgb(32, 31, 31) inset, 0 0 10px black;
        padding: 15px;
      }
          .basic-title {
            font-size: 0.98rem;
            font-weight: 600;
          }
        .info-item {
          font-size: 14px;
          display: flex;
          padding-top: 10px;
        }
          .item-key {
            color: rgb(206, 203, 203);
          }
          .item-value {
            flex: 1;
            padding-left: 10px;
          }
          .info-ico {
            margin-right: 10px;
          }
            .info-ico img{
              width: 20px;
              height: 20px;
            }
        .listen-item {
          display: flex;
          padding-top: 10px;
        }
          .song-title-img {
            width: auto;
          }
            .song-title-img img {
              width: 60px;
              height: 60px;
              border-radius: 10px;
            }
          .listen-desc-text {
            flex: 1;
            padding-left: 15px;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
            .song-title {
              height: 25px;
            }
            .desc-text {
              font-size: 10px;
              color: rgb(211, 207, 207);
              height: 20px;
              line-height: 20px;
            }
</style>