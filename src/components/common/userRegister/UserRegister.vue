<template>
  <div class="user-register">
    <more-bar class="back-btn" :white="true"/>
    <div class="register-form">
      <div class="logo-ico">
        <img src="~assets/imgs/information/wyy.svg" alt="">
      </div>
      <div v-if="$route.params.state === 'true'" class="exist-user">
        <div class="user-number"> 
          <div> {{ hideNumber }} </div>
          <div class="number-info-text">天翼账号提供认证服务</div>
        </div>
        <div class="register-btn textRed" @click="registerBtn"> 一键登录 </div>        
      </div>
      <div v-else class="inexistenc-user">
        <div class="input">
          <input type="text" 
                 v-model="numberValue" 
                 placeholder="天翼账号 / 手机号"/>
        </div>
        <input-hidden class="input" @emitInput="getPassword" :password="passwordValue" :placeholder="'密码'"/>
        <div class="register-btn regBtn" @click="registerClick"> 登录 </div>    
      </div>
      <div class="register-type">
        <div class="reg-item"><img src="~assets/imgs/common/qq.png" alt=""></div>
        <div class="reg-item"><img src="~assets/imgs/common/weixin.png" alt=""></div>
        <div class="reg-item"><img src="~assets/imgs/common/xinlang.png" alt=""></div>
      </div>
    </div>
    <div class="foot-text">用户协议、隐私政策、天翼账号服务协议</div>
    <toast :order="order" :text="toastText"/>
  </div>
</template>

<script>
  import MoreBar from 'components/content/sheetBar/SheetBar'
  import Toast from 'components/content/toast/Toast'
  import InputHidden from 'components/common/inputHidden/InputHidden'

  import { WYY_USER, KEY } from 'common/strings'
  import { cipherFunc, decipherFunc, getKey } from 'common/crypto'
  import { getDetectionSate, userRegister, loginStatus,  againRes, logout } from 'network/register'
  import { setCookie, getCookie, removeCookie } from 'common/storageCookie'
  
  export default {
    name: 'MyMessage',
    components: {
      MoreBar,
      Toast,
      InputHidden,
    },
    data() {
      return {
        hideNumber: '', //粗略账号
        password: '',
        numberValue: '',
        passwordValue: '',
        order: false,
        toastText: '',
        date_day: 30, //登录保存时长
      }
    },
    computed: {
      number: {
        get() {
          return this.$store.state.userData.phone;
        },
        set(num) {
          this.$store.state.userData.phone = num;
        }
      }
    },
    mounted() {
      if (this.$route.params.state === 'true') {
        let str_num = getKey(KEY); //钥匙
        let value = getCookie(WYY_USER);
        let decipher = decipherFunc(str_num, value);
        let index = decipher.indexOf("&");
        let number = decipher.substring(0,index);
        let hide_number = number.substring(0,3) + '****' + number.substring(7);
        let password = decipher.substring(index + 1);
        this.hideNumber = hide_number;
        this.number = number;
        this.password = password;
      }
    },
    methods: {
      /**
       * 登录账号
       */
      registerClick() {
        if (this.numberValue) {
          getDetectionSate(this.numberValue).then(res => {
            if (!res.hasPassword) {
              this.toastText = '账号未注册'
              this.order = !this.order;
            }else if (!this.passwordValue) {          
              this.toastText = '请填写密码';
              this.order = !this.order;
            }else {
              userRegister(this.numberValue, this.passwordValue).then(res => {
                if(res.code === 502) {
                  this.toastText = '密码错误';
                  this.order = !this.order;
                }else if (res.code === 200) { //成功登录
                  let str_num = getKey(KEY); //钥匙
                  let value = cipherFunc(str_num,this.numberValue +"&"+ this.passwordValue); //加密储存账号
                  setCookie(WYY_USER, value, this.date_day); //储存cookie
                  this.$store.state.cookieState = true;
  
                  loginStatus(); //登录状态
                  againRes(); //刷新登录
                  this.$store.state.userData.state = true; //暂存数据
                  this.$store.state.userData.id = res.profile.userId;
                  this.$store.state.userData.name = res.profile.nickname;
                  this.$store.state.userData.gender = res.profile.gender;
                  this.$store.state.userData.birthday = res.profile.birthday;
                  this.$store.state.userData.signature = res.profile.signature;
                  this.$store.state.userData.userPic = res.profile.avatarUrl;
                  this.$store.state.userData.bgUrl = res.profile.backgroundUrl;
                  this.number = this.numberValue;
                  
                  this.toastText = '登陆成功';
                  this.order = !this.order;
                  this.$router.push('/myMessage');
                  this.$bus.$emit('setIndex');
                }else {
                  this.toastText = '服务器出现故障';
                  this.order = !this.order;
                }
              })
            }
          })
          
        } else {
          this.toastText = '请填写账号';
          this.order = !this.order;
        } 
      },
      /**
       * 登录cookie储存账号
       */
      registerBtn() { 
        if (this.number.length && this.password.length) {
          userRegister(this.number, this.password).then(res => {
            if (res.code === 200) {
              this.$store.state.cookieState = true;
              this.$store.state.userData.state = true; //暂存数据
              this.$store.state.userData.id = res.profile.userId;
              this.$store.state.userData.name = res.profile.nickname;
              this.$store.state.userData.gender = res.profile.gender;
              this.$store.state.userData.birthday = res.profile.birthday;
              this.$store.state.userData.signature = res.profile.signature;
              this.$store.state.userData.userPic = res.profile.avatarUrl;
              this.$store.state.userData.bgUrl = res.profile.backgroundUrl;
              this.$router.push('/myMessage');
              this.$bus.$emit('setIndex');
              loginStatus(); //登录状态
              againRes(); //刷新登录
            }else if (res.code === 502) {
              this.logoutRegister();
            }
          }).catch(err => {
            let code = Object.create(err).response.data.code;
            if (code === 509) {
              this.logoutRegister();
            }
          })
        }
      },
      /**
       * 退出账号清除数据
       */
      logoutRegister() {
        this.toastText = '账号已过期';
        this.order = !this.orde
        removeCookie(WYY_USER);
        this.$store.state.cookieState = false;
        this.$store.state.userData.state = false;
        this.$store.state.userData.id = 0;
        this.$store.state.userData.name = '';
        this.$store.state.userData.gender = 0;
        this.$store.state.userData.birthday = 0;
        this.$store.state.userData.signature = '';
        this.$store.state.userData.userPic = ''
        this.$store.state.userData.bgUrl = '';
        this.$store.state.userData.phone = ''
        logout(); //退出登录
        againRes(); //刷新登录
        this.$route.params.state = 'false';
      },
      /**
       * 获取passwod
       */
      getPassword(num) {
        this.passwordValue = num;
      }
    },
  }
</script>

<style>
  .user-register {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgb(255, 22, 22);
    position: relative;
    z-index: 30;
  }
    .back-btn {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      width: 100vw;
      height: auto;
    }
    .register-form {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
      .logo-ico {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 20vw;
        height: 20vw;
        background: linear-gradient(to right, rgba(228, 106, 106, 0.5), rgba(255, 50, 50,0.5));
        border-radius: 50%;
        margin: 100px 0 170px;
      }
        .logo-ico img {
          width: 50%;
          height: 50%;
        }
      .user-number {
        text-align: center;
        width: 300px;
        color: white;
        letter-spacing: 2px;
        padding-left: 5px;
        margin-bottom: 10px;
      }
        .number-info-text {
          font-size: 10px;
          color: rgb(231, 231, 231);
          letter-spacing: 3px;
          transform: scale(0.7);
        }
      .register-btn {
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 40px;
        color: white;
        border-radius: 20px;
        letter-spacing: 5px;
        padding-left: 5px;
        margin: 10px 0;
        border: 1px solid white;
      }
      .register-type {
        display: flex;
        justify-content: space-evenly;
        width: 70vw;
      }
        .reg-item {
          margin-top: 10px;
          width: 35px;
          height: 35px;
          border: solid rgba(255, 255, 255,0.5) 1px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
          .reg-item img {
            width: 25px;
            height: 25px;
          }
    .foot-text {
      bottom: 30px;
      color: white;
      font-size: 12px;
      margin-top: 30px;
    }
      .input {
        text-align: center;
        position: relative;
      }
      .input input{
        border: none;
        border-style: none;
        height: 30px;
        width: 70vw;
        border-radius: 15px;
        margin: 5px 0;
        padding-left:20px;
        padding-right: 35px;
      }
        .input .eye-inco {
          right: 10px;
        }
          .textRed {
            background-color: white;
            color: red;
          }
          .regBtn:active {
            background-color: white;
            color: red;
          }
</style>