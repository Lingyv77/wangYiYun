<template>
  <div id="app">
    <music-nav-bar/>
    <left-popup/>

    <router-view v-slot="{ Component }">
    <keep-alive :include="$store.state.keepLiveRoute" exclude="SheetInfo,,PlayMusic,ClassifyInfo,UserInfo">
      <component :is="Component" />
    </keep-alive>
    </router-view>

    <play-nav/>
  </div>
</template>

<script>
  import { WYY_USER } from 'common/strings'
  import { getCookie } from 'common/storageCookie'

  import MusicNavBar from 'components/content/musicNavBar/MusicNavBar'
  import LeftPopup from 'views/leftPopup/LeftPopup'
  import PlayNav from 'components/content/playNav/PlayNav'

  export default {
    name: 'App',
    components: {
      MusicNavBar,
      LeftPopup,
      PlayNav
    },
    created() {
      if (getCookie(WYY_USER)) { //判断是否存在cookie
        this.$store.state.cookieState = true;
      }
    },
  }
</script>

<style>
  @import 'assets/css/base.css';

  #app {
    height: 100vh;
    background-color: #f0efef;
  }
</style>
