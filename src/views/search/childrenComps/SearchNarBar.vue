<template>
    <nav-bar class="top-search">
      <template v-slot:left>
        <div @click="backClick">
          <img src="~assets/imgs/radioStation/fanhui.png" class="to-back" alt="">
        </div>
      </template>
      <template v-slot:center>
        <div class="search-box">
          <input type="text" autofocus
                 v-model="searchContent"
                 :placeholder="searchContent"
                 @focus="toFocus"
                 @blur="toBlur"/>
        </div>
      </template>
      <template v-slot:right>
        <div @click="searchClick">
          <img src="~assets/imgs/search/sousuo2.svg" class="to-search" alt="">
        </div>
      </template>
    </nav-bar>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  import { getDefault } from 'network/search'
  
  export default {
    name: "Search",
    data() {
      return {
        searchContent: ''
      }
    },
    components: {
      NavBar
    },
    mounted() {
      getDefault().then(res => {
        this.searchContent= res.realkeyword;
      })
      this.$bus.$emit('searchText', this.searchContent);
    },
    methods: {
      backClick() {
        this.$router.go(-1);
        this.$bus.$emit('setIndex');
      },
      toFocus() {
        if (this.searchContent.length !== 0) {
          this.$emit('toFocus');
        }
      },
      toBlur() {
        this.$emit('toBlur');
      },
      serchClick() {

      }
    },
    watch: {
      searchContent() {
        this.$bus.$emit('searchText', this.searchContent);
        if (this.searchContent.length == 0)
          this.$emit('watchSearch', false);
        else
          this.$emit('watchSearch', true);
      }
    }
  }
</script>

<style scoped>
  .top-search {
    position: fixed;
    width: 100vw;
    z-index: 8;
    left: 0;
    top: 0;
    right: 0;
    background-color: white;
    box-shadow: 1px 0 1px rgba(214, 206, 206, 0.7);
  }
    .to-back, .to-search {
      width: 20px;
      height: 20px;
      vertical-align: middle;
    }
    .search-box {
      width: 100%;
      height: 85%;
      border-bottom: 1px solid rgb(190, 190, 190);
    }
    .search-box input {
      width: 100%;
      height: 100%;
      border: 0;
      padding: 0;
      font-size: 16px;
      color: rgb(133, 133, 133);
      background-color: rgba(0,0,0,0);
    }
</style>