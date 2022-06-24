<template>
  <div class="play-nav">
    <nav-bar>
      <template v-slot:left>
        <div class="leftback" @click="backClick">
          <img src="~assets/imgs/common/fanhui.svg" alt="">
        </div>
      </template>
      <template v-slot:center>
        <div class="title">
          {{ title }}
        </div>
      </template>
      <template v-slot:right>
        <div class="right">
          <img src="~assets/imgs/playSong/fenxiang.svg" alt="">
        </div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  export default {
    name: "PlayNav",
    components: {
      NavBar
    },
    props: ['title'],
    methods: {
      backClick() {
        this.$router.go(-1);
      }
    },
  }
</script>

<style scoped>
  .title {
    color: white;
    text-overflow: ellipsis;
    word-break: break-all;
    overflow: hidden;
    height: 44px;
  }
</style>