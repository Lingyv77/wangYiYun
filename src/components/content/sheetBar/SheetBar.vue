<template>
  <div class="sheet-bar">
     <nav-bar class="more-sheet-nav">
      <template v-slot:left>
        <div class="back-btn" @click="backClick">
          <img v-if="white" src="~assets/imgs/common/back-white.png" alt="">
          <img v-else src="~assets/imgs/radioStation/fanhui.png"  alt="">
        </div>
      </template>
      <template v-slot:center>
        <div class="title">
          {{ title }}
        </div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  export default {
    name: "moreBar",
    components: {
      NavBar
    },
    props: {
      title: {
        type: String,
        defalut: ''
      },
      white: {
        type: Boolean,
        defalut: false
      }
    },
    methods: {
      /**
       * 返回上一页
       */
      backClick() {
        this.$router.go(-1);
      },
    },
  }
</script>

<style scoped>
    .back-btn {
      width: 50px;
      height: 100%;
    }
      .back-btn img {
        width: 20px;
        height: 20px;
        margin-top: 10px;
      }
</style>

