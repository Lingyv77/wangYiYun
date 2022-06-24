<template>
  <div class="input-hidden">
    <input :type='type' 
             :value="password"
             :placeholder="placeholder"
             @input="emitInput"/>
    <div class="eye-inco" 
         @click="showBtn">
      <img v-if="showPassword"  src="~assets/imgs/common/open-eye.png" alt="">
      <img v-else src="~assets/imgs/common/close-eye.png" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'InputHidden',
    setup(props, context) {
      const emitInput = (e) => {
        context.emit('emitInput',e.srcElement.value);
      }

      return {
        emitInput
      }
    },
    data() {
      return {
        showPassword: false,
        type: 'password'
      }
    },
    props: {
      placeholder: {
        type: String,
        default: ''
      },
      password: {
        type: String,
        default: '',
      },
    },
    methods: {
      /**
       * 显示password
       */
      showBtn() { 
        this.showPassword = !this.showPassword;
        if(this.showPassword) {
          this.type = 'text';
        }else {
          this.type = 'password';
        }
      },
    },
  }
</script>

<style scoped>
  .input-hidden {
    text-align: center;
    position: relative;
  }
    .eye-inco {
      width: 20px;
      height: 100%;
      position: absolute;
      right: 0px;
      top: 0px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
      .eye-inco img {
        width: 20px;
        height: 20px;
      }
</style>