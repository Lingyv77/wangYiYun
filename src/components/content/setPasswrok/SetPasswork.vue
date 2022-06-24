<template>
  <div class="set-password">
    <nav-bar class="navBar">
      <template v-slot:left>
        <div class="back" @click="toBack">
          <img  src="~assets/imgs/common/back-white.png" alt="">
        </div>
      </template>
    </nav-bar>
    <div class="from">
      <div class="phone">用户 : {{ phone }} </div>
      <div class="password">
        <div class="num-box flex-conter">
           新密码 : <input-hidden class="password-num" :password="newNumber1" @emitInput="getNumber1"/>
        </div>
        <div class="num-box flex-conter">
           新密码 : <input-hidden class="password-num" :password="newNumber2" @emitInput="getNumber2"/>
        </div>
      </div>
      <div class="verification flex">
        <div class="input-cont">
          <div class="nums flex">
            <div v-for="(item, index) in verificationList" :class="{ activeBorderColor: item .length}" :key="index" class="item-num">
              {{ item }}
            </div>
          </div>
          <input type="text" v-model="verification_value" @input="verifiInput" size="4" maxlength="4">
        </div>
        <div class="get-btn" @click="getCode" :class="{ getCodeAwait: !awaitOrder }"> {{ messageText }} </div>
      </div>
      <div class="verify-btn" @click="setPassword"> 确定 </div>
    </div>
    <toast :text="message" :order="order"/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import Toast from 'components/content/toast/Toast';
  import InputHidden from 'components/common/inputHidden/InputHidden';

  import { getCodeValue, changePassword } from 'network/register'

  export default {
    name: 'SetPassword',
    components: {
      NavBar,
      Toast,
      InputHidden
    },
    data() {
      return {
        verificationList: ['','','',''],
        verification_value: '',
        messageText: '获取验证码',
        newNumber1: '',
        newNumber2: '',
        message: '',
        order: false,
        awaitTime: 60000, //再次发送等待时长 ms
        awaitOrder: true,
      }
    },
    computed: {
      phone: {
        get() {
          return this.$store.state.userData.phone;
        }
      },
      userName: {
        get() {
          return this.$store.state.userData.name;
        }
      }
    },
    methods: {
      toBack() {
        this.$router.go(-1);
      },
      verifiInput(e) {
        let value = e.srcElement.value;
        e.srcElement.value = value.replace(/[^\d]/ig,'');
        this.verificationList.fill('');
        for (let i = 0; i < e.srcElement.value.length; i++) {
          this.verificationList[i] = e.srcElement.value[i];
        }
      },
      /**
       * 获取验证码
       */
      getCode() {
        if (this.awaitOrder) {
          getCodeValue(this.phone).then(res => {
            if (res.code === 200) {
              this.message = '验证码已发送';
              this.order = !this.order;

              //再次发送验证等待操作
              this.awaitOrder = false;
              let count = this.awaitTime / 1000;
              this.messageText = `${count--}秒后发送`;
              this.change_message_text = setInterval(() => {
                if (count) {
                  this.messageText = `${count--}秒后发送`;
                }
              }, 1000);
              this.get_code_timer = setTimeout(() => {
                this.awaitOrder = true;
                clearInterval(this.change_message_text);
                this.messageText = '重新发送';
              }, this.awaitTime);
            }else {
              this.message = '发送失败';
              this.order = !this.order;
            }
          })
        }
      },
      getNumber1(num) {
        this.newNumber1 = num;
      },
      getNumber2(num) {
        this.newNumber2 = num;
      },
      /**
       * 确定操作
       */
      setPassword() {
        this.verification_value = this.verificationList.join('');
        if (!this.newNumber1.length || !this.newNumber2.length) {
          this.message = '新密码未填写';
          this.order = !this.order;
        }else if (this.newNumber1 === this.newNumber2) {
          if (this.newNumber1.length < 11 || this.newNumber1.length > 18) {
            this.message = '新密码不符合';
            this.order = !this.order;
          }else if (!this.verification_value.length) {
            this.message = '请输入验证码';
            this.order = !this.order;
          }else if (this.verification_value.length !== 4) {
            this.message = '请填写完验证';
            this.order = !this.order;
          }else if (this.newNumber1.length >= 11 && this.newNumber1.length <= 18 && this.newNumber1.search(/[a-z]/gi) === -1) {
              this.message = '密码需含字母';
              this.order = !this.order;
          }else {
            changePassword({
              captcha: this.verification_value, // 验证码
              phone: this.phone, // 手机号码
              password: this.newNumber1, // 密码
              // nickname: this.userName, // 昵称
            }).then(() => {
              this.message = '修改密码成功';
              this.order = !this.order;

              //数据清除
              this.verificationList = ['','','',''];
              this.verification_value = '';
              this.newNumber1 = '';
              this.newNumber2 = '';
              this.awaitOrder = true;
              clearInterval(this.change_message_text);
              clearTimeout(this.get_code_timer);
              this.messageText = '获取验证码';
            }).catch(err => {
              let code = Object.create(err).response.data.code;
              if (code === 503) {
                this.message = '验证码错误';
                this.order = !this.order;
              }else {
                this.message = '修改密码失败';
                this.order = !this.order;
              }
            })
          }
        }else {
          this.message = '新密码不一致';
          this.order = !this.order;
        }
      }
    }
  }
</script>

<style>
  .set-password {
    position: relative;
    z-index: 21;
    width: 100vw;
    height: 100vh;
    background-color: rgb(50, 50, 50);
    color: rgb(230, 230, 230);
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
    .from {
      padding: 10px;
      display: flex;
      flex-direction: column;
      text-align: center;
    }
      .phone {
        font-size: 18px;
      }
      .password {
        width: 100%;
        font-size: 18px;
        color: rgb(206, 206, 206);
      }
        .num-box {
          margin-top: 20px;
        }
        .flex-conter {
          display: flex;
          justify-content: center;
        }
          .num-box input {
            width: 50vw;
            padding: 0 10px;
            border-style: none;
            border-bottom: solid 1px rgb(174, 174, 174);
            height: 30px;
            font-size: 18px;
            background-color: rgba(0,0,0,0);
            color: rgb(174, 174, 174);
            margin-left: 10px;
          }
      .verification {
        margin-top: 40px;
        height: 5vh;
      }
        .input-cont {
          height: 100%;
          display: flex;
          justify-content: flex-end;
          flex: 1;
          position: relative;
        }
          .input-cont input {
            border-style: none;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0);
            opacity: 0;
            color: rgb(189, 189, 189);
          }
            .item-num {
              border-bottom: 1px solid rgb(95, 94, 94);
              width: 10vw;
              margin: 0 10px;
            }
            .activeBorderColor {
              border-bottom: 1px solid rgb(193, 187, 187);
            }
        .get-btn {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 70px;
          margin-left: 10px;
          padding: 2px 3px;
          border-radius: 10px;
          border: rgb(184, 184, 184) solid 1px;
          font-size: 12px;
          color: rgb(184, 184, 184);
        }
        .getCodeAwait {
          border: rgb(147, 147, 147) solid 1px;
          color: rgb(147, 147, 147);
        }
        .verify-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 70vw;
          position: absolute;
          left: 15vw;
          bottom: 15vh;
          min-height: 30px;
          border-radius: 30px;
          border: 1px solid rgb(182, 180, 180);
          color: rgb(182, 180, 180);
        }
</style>