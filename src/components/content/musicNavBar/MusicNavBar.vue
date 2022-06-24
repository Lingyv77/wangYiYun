<template>
  <nav-bar id="navbar">
    <template v-slot:left>
      <div @click="showPopup">
        <img src="~assets/imgs/common/hanbaotu.png" class="titleimg" alt="">
      </div>
    </template>
    <template v-slot:center>
      <div class="flex">
      <div v-for="(item, index) in titleList" :key="index" 
           class="item"
           :class="{active: currentIndex === index}"
           @click="itemClick(index)">
        {{item}}
      </div>
      </div>
    </template>
     <template v-slot:right>
      <div @click="toSearch">
        <img src="~assets/imgs/common/sousuo.png" class="titleimg" alt="">
      </div>
    </template>
  </nav-bar>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar.vue'
  import router from '@/router'

  export default {
    name: "MusicNavBar",
    data() {
      return {
        currentIndex: 1,
        titleList: ["我的", "发现", "云村", "视频"],
        pathList: ['/myMessage','/discover','/cloudVillage','/video']
      }
    },
    components: {
      NavBar
    },
    setup() {
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index;
        router.push({path:this.pathList[index]});
      },
      showPopup() { //发送事件总线
        this.$bus.$emit('LeftPopupShow');
      },
      toSearch() { //跳转搜索页
        this.$router.push('/discover/search');
      },
      setIndex() {
        let awaitIn = null;
        awaitIn = setInterval(() => {
          if (this.pathList.indexOf(this.$route.path) !== -1) {
            this.currentIndex =  this.pathList.indexOf(this.$route.path); 
            clearInterval(awaitIn);
          }
        }, 10)
      }
    },
    mounted() {
      this.$bus.$on('setIndex', this.setIndex);
    }
  }
</script>

<style scoped>
  #navbar {
    background-color: white;
    color: black;
    position: fixed;
    width: 100vw;
    z-index: 9;
    top: 0;
    left: 0;
    right: 0;
  }
    .item {
      flex: 1;
    }
    .active {
      color: rgb(0, 0, 0);
      font-size: 20px;
      line-height: 40px;
    }
    .titleimg {
      line-height: 44px;
      width: 25px;
      height: 25px;
      vertical-align: middle;
    }
</style>