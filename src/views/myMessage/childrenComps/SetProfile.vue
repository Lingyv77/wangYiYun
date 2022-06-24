<template>
  <div class="set-profile">
    <nav-bar class="navBar">
      <template v-slot:left>
        <div class="back" @click="toBack">
          <img  src="~assets/imgs/common/back-white.png" alt="">
        </div>
      </template>
      <template v-slot:center>
        <div class="titel">
          我的资料
        </div>
      </template>
      <template v-slot:right>
        <div class="keep-data" @click="keepBtn">
          保存
        </div>
      </template>
    </nav-bar>
    <div class="profile-box">
      <div class="set-picUrl"> 头像  <div class="picurl-img"><img :src="$store.state.userData.userPic" alt=""></div></div>
      <div class="set-userName"> 昵称 <div class="name"> <input type="text" v-model="name"> </div></div>
      <div class="set-sex" @click="setSexView"> 性别 <div class="sex"> {{ sex }} </div> 
        <show-view :show="setSexViewShow" @setShow="offSexShow">
          <div class="set-sex-box" >
            <div v-for="(item, index) in ['男','女']" class="item" 
                 :key="index" 
                 :class="{ SexAcitve: index+1 === setSexIndex }" 
                 @click="setSexCurrindexBtn(index)"> 
            {{ item }} </div>
          </div>
        </show-view>
      </div>
      <div class="set-picCode"> 二维码 <div class="pic-code"><img src="~assets/imgs/myMessage/picture-code.png" alt=""></div></div>
    </div>
    <div class="profile-box">
      <div class="birthday" @click="setBirthdayView"> 生日 <div class="birthday"> {{ birthday }} </div>
        <show-view :show="setBirthdayViewShow" @setShow="offBirthdayShow">
          <date-from class="set-date" 
                     ref="dateData"
                     @year="getYear"
                     @month="getMonth"
                     @day="getDay"/>
        </show-view>
      </div>
      <div class="area"> 地区 </div>
      <div class="university"> 大学 <div class="university"> {{ getUniversity }} </div></div>
      <div class="music-table"> 音乐标签 <div class="muisc-list"> {{ muiscTableList }} </div></div>
      <div class="intor" @click="setIntorView"> 简介 <div class="signature"> {{ signature }} </div>
        <show-view :show="setIntorViewShow" @setShow="offIntorShow">
          <div class="set-intor-box">
            <div>
              <span :style="{ color: intorText.length === 300 ? 'rgb(106, 106, 106)' : '#a29e9e' }"> {{ intorText.length }}</span><span> / 300 </span>
            </div>
            <textarea onfocus v-model="intorText" maxlength="300"></textarea> 
          </div>
        </show-view>
      </div>
    </div>
    <div class="profile-box">
      <div class="set-passwork" @click="setPasswork"> 修改密码 </div>
    </div>
    <toast :text="message" :order="order"/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import ShowView from 'components/content/showView/ShowView';
  import DateFrom from 'components/common/dateFrom/DateFrom';
  import Toast from 'components/content/toast/Toast';

  import { setUserInfo } from 'network/register'

  export default {
    name: 'SetProfile',
    components: {
      NavBar,
      ShowView,
      DateFrom,
      Toast
    },
    data() {
      return {
        setSexViewShow: false,
        setIntorViewShow: false,
        setBirthdayViewShow: false,
        intorText: '',
        name: '', //姓名
        sex: '', //性别
        signature: this.getSignature(this.$store.state.userData.signature), //简介
        birthday: this.getBirthday(this.$store.state.userData.birthday), //生日
        setSexIndex: 0, 
        dateCount: 0,
        setSign: true, //时间更新
        dateList: [undefined,undefined,undefined],
        offBirthday: false,
        message: '',
        order: false,
      }
    },
    created() {
      this.intorText = this.signature;
      let initialze = setInterval(() => {
        if (this.$store.state.userData.name && this.$store.state.userData.signature !== '' && this.$store.state.userData.birthday && this.$store.state.userData.gender) {
          this.name = this.$store.state.userData.name;
          this.signature = this.getSignature(this.$store.state.userData.signature);
          this.birthday = this.getBirthday(this.$store.state.userData.birthday);
          this.sex = this.getSex(this.$store.state.userData.gender);
          this.setSexIndex = this.$store.state.userData.gender;
          this.dateCount = this.$store.state.userData.birthday;
          clearInterval(initialze);
        }
      }, 50);
    },
    methods: {
      // 修改性别弹窗
      setSexView() {
        this.setSexViewShow = true;
      },
      // 修改简介弹窗
      setIntorView() {
        this.setIntorViewShow = true;
      },
      // 修改出生日弹窗
      setBirthdayView() {
        this.setBirthdayViewShow = true;
      },
      //取消sexView弹窗
      offSexShow(value) {
        this.setSexViewShow = value;
      },
      //取消intorView弹窗
      offIntorShow(value) {
        this.setIntorViewShow = value;
      },
      //取消birthdayView弹窗
      offBirthdayShow(value) {
        this.setBirthdayViewShow = value;
        this.birthdayTimer = setInterval(() => {
          if (this.offBirthday) {
            this.birthday = this.getBirthday(this.dateCount);
            clearInterval(this.birthdayTimer);
          }
        }, 100);
      },
      getYear(data) {
        this.dateList[0] = data;
        this.setSign = !this.setSign;
      },
      getMonth(data) {
        this.dateList[1] = data;
        this.setSign = !this.setSign;
      },
      getDay(data) {
        this.dateList[2] = data;
        this.setSign = !this.setSign;
      },
      /**
       * 返回
       */
      toBack() {
        this.$router.go(-1);

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
      /**
       * 修改性别
       */
      setSexCurrindexBtn(index) {
        this.setSexIndex = index+1;       
      },
      /**
       * 保存修改
       */
      keepBtn() {     
        setUserInfo({
          nickname: this.name,
          gender: this.setSexIndex,
          birthday: this.dateCount,
          signature: this.signature
        }).then(() => {
          this.$store.state.userData.name = this.name;
          this.$store.state.userData.gender = this.setSexIndex;
          this.$store.state.userData.birthday = this.dateCount;
          this.$store.state.userData.signature = this.signature;
          this.message = '修改成功'
          this.order = !this.order;
        }).catch(err => {
          let code = Object.create(err).response.data.code;
          if (code === 505) {
            this.message = '昵称不能使用';
            this.order = !this.order;
          }else {
            this.message = '修改失败';
            this.order = !this.order;
          }
        })
      },
      /**
       * 获取性别
       */
      getSex(num) {
        if (num === 1) {
          return '男';
        } else if(num === 2) {
          return '女';
        } else {
          return '未知'
        }
      },
      /**
       * 获取个人简介
       */
      getSignature(text) {
        if (text) {
          return text;
        }else {
          return '还没有简介';
        }
      },
      /**
       * 获取出生日
       */
      getBirthday(date) {
        if (date) {
          return this.norm_time(date);
        }else {
          return '未设置';
        }
      },
      /**
       * 修改密码
       */
      setPasswork() {
        this.$router.push('setPasswork');
      }
    },
    computed: {
      /**
       * 获取大学
       */
      getUniversity() {
        return '未填写';
      },
      /**
       * 获取音乐标签
       */
      muiscTableList() {
        return '选择标签';
      },
    },
    watch: {
      setSexViewShow() {
        if (!this.setSexViewShow) {
          this.sex = this.getSex(this.setSexIndex);
        }
      },
      setIntorViewShow() {
        if (!this.setIntorViewShow) {
          this.signature = this.intorText;
        }
      },
      setSign() {
        if (this.dateList.every(i => i !== undefined)) {
          this.dateCount = Date.parse(new Date(this.dateList.join('-')));
          this.offBirthday = true;
        }
      },
    }
  }
</script>

<style scoped>
  .set-profile {
    position: relative;
    z-index: 21;
    width: 100vw;
    height: 100vh;
    background-color: rgb(29, 29, 29);
    color: rgb(230, 230, 230);
  }
    .navBar {
      background-color: rgb(56, 56, 56);
    }
      .back {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
        .back img {
          width: 25px;
        }
    .profile-box {
      background-color: rgb(56, 56, 56) ;
      margin: 10px 0;
      padding: 0 10px;
    }
      .profile-box > div {
        border-top: rgb(110, 109, 109) solid 1px;
        padding: 10px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .profile-box div:first-child{
         border-top: none;
      }
        .profile-box > div > div {
         color: #a29e9e; 
        }
        .picurl-img {
          width: 50px;
          height: 50px;
        }
          .picurl-img img {
            width: 100%;
            border-radius: 50%;
          }
        .name {
          font-size: 12px;
        }
          .name input {
            text-align: right;
            background-color: rgba(0,0,0,0);
            border: none;
            border-style: none;
            color: rgb(230, 230, 230);
            padding: 3px 0;
          }
            .set-sex-box {
              width: 60vw;
              height: 20vh;
              margin: 40vh 20vw;
              background-color: rgb(32, 32, 32) ;
              border-radius: 10px;
              display: flex;
              justify-content: center;
              align-items: center;
              overflow: scroll;
            }
              .set-sex-box div {
                flex: 1;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 20px;
                font-weight: 600;
              }
              .SexAcitve {
                background-color: rgb(56, 56, 56) ;
                color: rgb(20, 20, 20);
              }
            .set-date {
              width: 60vw;
              height: 20vh;
              margin: 40vh 20vw;
            }
          .signature {
            text-align: right;
            width: 60vw;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            word-break: break-all;
          }
            .set-intor-box {
              width: 70vw;
              height: 30vh;
              margin: 35vh 15vw;
              background-color: rgb(32, 32, 32) ;
              border-radius: 10px;
              padding: 10px;
              display: flex;
              flex-direction: column;
            }
              .set-intor-box textarea {
                outline:none;
                resize: none; 
                flex: 1;
                background-color: rgba(0,0,0,0);
                border: none;
                border-style: none;
                color: rgb(187, 186, 186);
                padding: 3px 0;
              }
              .set-intor-box textarea::-webkit-scrollbar {
                width: 0;
              }
        .pic-code {
          width: 30px;
          height: 30px;
        }
          .pic-code img {
            width: 100%;
          }
</style>