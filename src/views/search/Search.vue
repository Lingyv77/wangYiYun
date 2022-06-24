<template>
  <div id="search-content">
    <div class="warp-search">
      <search-nav-bar @to-focus="toFocus"
                      @to-blur="toBlur"
                      @watch-search="watchSearch"/>
      <search-suggest :isShow="showSuggest"/>
      <search-hotdetail/>
    </div>
  </div>
</template>

<script>
  import SearchNavBar from './childrenComps/SearchNarBar'
  import SearchSuggest from './childrenComps/SearchSuggest'
  import SearchHotdetail from './childrenComps/SearchHotdetail'
  
  export default {
    name: "Search",
    data() {
      return {
        showSuggest: false
      }
    },
    components: {
      SearchNavBar,
      SearchSuggest,
      SearchHotdetail
    },
    methods: {
      toFocus() {
        this.showSuggest = true;
      },
      toBlur() {
        this.showSuggest = false;
      },
      watchSearch(boolean) {
        this.showSuggest = boolean;
      }
    },
  }
</script>

<style scoped>
  #search-content {
    position: relative;
    height: calc(100vh - 44px - 56px);
    width: 100vw;
    overflow: hidden;
    box-sizing: content-box;
    z-index: 20;
    top: 44px;
    background-color: rgb(250, 250, 250);
  }
    .warp-search{
      height: 100%;
      padding: 10px 0;
      overflow: scroll;
    }
</style>