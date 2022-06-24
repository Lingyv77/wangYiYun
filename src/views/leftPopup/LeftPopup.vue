<template>
  <div id="left-popup" v-show="isShow">
    <div class="popup-bg" @click="popupBgClick()" ref="popupBg"></div>
    <div class="popup-content" ref="popupContent">
      <div class="message-title flex">
        <div class="left-message flex">
          <div class="bg-img top3">
            <img src="~assets/imgs/popup/yun.svg" alt="">
          </div>
          <div class="text-warp">
            <div class="text-title">云贝中心</div>
            <div class="text-tag">签到</div>
          </div>
        </div>
        <div class="right-message flex">
          <div class="bg-img top3">
            <img src="~assets/imgs/popup/message.svg" alt="">
          </div>
          <div class="text-warp">
            <div class="text-title">消息中心</div>
            <div class="text-desc">{{message}}</div>
          </div>
        </div>
      </div>
      <div class="createCenter flex">
        <div class="bg-img">
          <img src="~assets/imgs/popup/dengpao.svg" alt="">
        </div>
        <div class="text-title create-title">创作者中心</div>
      </div>
      <popup-item :title="'音乐服务'" :itemList="itemList1"/>
      <popup-item :title="'音乐服务'" :itemList="itemList2"/>
      <popup-item :titleShow="false" :itemList="itemList3"/>
      <div v-if="!$store.state.userData.state" @click="registerBtn" class="exit-register-btn">登录账号</div>
      <div v-else class="exit-register-btn" @click="exitRegister">退出登录</div>
    </div>
  </div>
</template>

<script>
  import { WYY_USER } from 'common/strings'
  import { removeCookie } from 'common/storageCookie'
  import { logout, againRes } from 'network/register'
  
  import popupItem from './childernComps/PopupItem'
   
  export default {
    name: 'LeftPopup',
    data() {
      return {
        isShow: false,
        isMove: false,
        message: '点击查看新消息',
        itemList1: [
          { icon: require("assets/imgs/popup/List1/gequ.svg"), text: "听歌识曲" },
          { icon: require("assets/imgs/popup/List1/piao.svg"), text: "云村有票" },
          { icon: require("assets/imgs/popup/List1/gwc.svg"), text: "商城" },
          { icon: require("assets/imgs/popup/List1/youxi.svg"), text: "游戏专区" },
          { icon: require("assets/imgs/popup/List1/ls.svg"), text: "口袋彩铃" },
        ],
        itemList2: [
          { icon: require("assets/imgs/popup/List2/zb.svg"), text: "个性装扮" },
          { icon: require("assets/imgs/popup/List2/ds.svg"), text: "定时关闭" },
          { icon: require("assets/imgs/popup/List2/sys.svg"), text: "扫一扫" },
          { icon: require("assets/imgs/popup/List2/xz.svg"), text: "边听边存" },
          {icon: require("assets/imgs/popup/List2/mll.svg"), text: "在线听歌免流量",},
          { icon: require("assets/imgs/popup/List2/hmd.svg"), text: "音乐黑名单" },
          { icon: require("assets/imgs/popup/List2/dp.svg"), text: "青少年模式" },
          { icon: require("assets/imgs/popup/List2/nz.svg"), text: "音乐闹钟" },
        ],
        itemList3: [
          { icon: require("assets/imgs/popup/List3/dd.svg"), text: "我的订单" },
          { icon: require("assets/imgs/popup/List3/yhq.svg"), text: "优惠券" },
          { icon: require("assets/imgs/popup/List3/bz.svg"), text: "帮助与反馈" },
          { icon: require("assets/imgs/popup/List3/gy.svg"), text: "关于" },
        ],
      }
    },
    components: {
      popupItem
    },
    mounted() {
      this.$bus.$on('LeftPopupShow',() => {
        if (!this.isMove) {
          let content = this.$refs.popupContent;
          let bg = this.$refs.popupBg;
          this.isShow = true;
          clearInterval(open);
          let open = null;
          let count = -100;
          let visible = 0;
          open = setInterval(() => {
            count = count + Math.ceil(-count / 8);
            visible += 0.03;
            content.style.left = `${count}px`;
            bg.style.backgroundColor = `rgba(0,0,0,${visible})`;
            if (count >= 0) {
              clearInterval(open);
              this.isMove = true;
            }
          }, 20);
        }
      })
    },
    methods: {
      /**
       * poupbg点击隐藏
       */
      popupBgClick() {
        if (this.isMove) {
          this.isMove = false;
          clearInterval(stop);
          let stop = null;
          let content = this.$refs.popupContent;
          let bg = this.$refs.popupBg;
          let count = 0;
          let visible = 0.75;
          stop = setInterval(() => {
            count = count + Math.floor((-content.offsetWidth - content.offsetLeft) / 8);
            visible -= 0.03;
            content.style.left = `${count}px`;
            bg.style.backgroundColor = `rgba(0,0,0,${visible})`;
            if (count <= -content.offsetWidth) {
              this.isShow = false;
              clearInterval(stop);
            }
          }, 20);
        }
      },
      /**
       * 登录账号
       */
      registerBtn() {
        this.popupBgClick();
        if (this.$store.state.cookieState) { //判断是否存在cookie
          this.$router.push('/safeRegister/'+true);
        }else {
          this.$router.push('/safeRegister/'+false);
        }
      },
      /**
       * 退出登录
       */
      exitRegister() {
        removeCookie(WYY_USER);
        this.$store.state.cookieState = false;
        logout(); //退出登录
        againRes(); //刷新登录
        this.$store.state.userData.state = false;
        this.$store.state.userData.id = 0;
        this.$store.state.userData.name = '';
        this.$store.state.userData.gender = 0;
        this.$store.state.userData.birthday = 0;
        this.$store.state.userData.signature = '';
        this.$store.state.userData.userPic = ''
        this.$store.state.userData.bgUrl = '';
        this.$store.state.userData.phone = '';
      }
    },
  }
</script>

<style scoped>
  #left-popup {
    height: 100vh;
    width: 100vw;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 21;
  }
    .popup-bg {
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0, 0.72);
      position: absolute;
    }
    .popup-content {
      height: 100%;
      overflow-x: hidden;
      width: 85%;
      background-color: #f0efef;
      position: absolute;
      padding: 10px;
      padding-bottom: 15px;
    }
    .popup-content::-webkit-scrollbar {
      width: 0px;
    }
      .message-title {
        background-color: white;
        border-radius: 10px;
        padding: 10px;
        margin-top: 20px;
      }
        .left-message {
          border-right: 1px solid #e6e6e6;
          flex: 1;
          padding: 10px 0;
        }
          .bg-img {
            width: 28px;
            height: 28px;
            border-radius: 50%;
            text-align: center;
            line-height: 28px;
            background-color: rgb(231, 67, 67);
          }
          .top3 {
            margin-top: 3px;
          }
          .text-warp {
            margin-left: 8px;
          }
            .text-title {
              font-weight: 600;
              font-size: 14px;
              margin-bottom: 3px;
            }
            .text-tag {
              border-radius: 9px;
              width: auto;
              color: red;
              float: left;
              padding: 0 8px;
              border: 1px solid red;
              text-align: center;
              height: 18px;
              line-height: 17px;
              font-size: 12px;
            }
            .text-desc {
              font-size: 12px;
              color: #c5c5c5;
            }
        .right-message {
          flex: 1;
          margin-left: 10px;
          padding: 10px 0;
        }
      .createCenter {
        padding: 15px 10px;
        margin-top: 10px;
        background-color: white;
        border-radius: 10px;
      }
        .create-title {
          line-height: 28px;
          margin-left: 10px;
        }
      .exit-register-btn {
        font-weight: 600;
        color: rgb(251, 62, 62);
        margin: 20px auto;
        border: rgb(251, 62, 62) solid 1px;
        text-align: center;
        border-radius: 10px;
        height: 30px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 150px;
      }
</style>