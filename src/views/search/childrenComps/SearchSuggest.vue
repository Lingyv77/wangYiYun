<template>
  <div class="search-suggest" ref="sub">
    <div class="search-key">搜索 : " {{keywork}} "</div>
    <div v-show="!notResult">
    <div class="search-result-item" v-for="(item, index) in list" 
                                    :key="index">
      <img src="~assets/imgs/search/sousuo2.svg" alt="">
       {{item}}
    </div>
    </div>
    <div v-show="notResult" class="not-resutl">
      无结果
    </div>
  </div>
</template>

<script>
  import { searchSuggest } from 'network/search';
  import { debounce } from 'common/common';

  export default {
    name: "SearchSuggest",
    props: ['isShow'],
    data() {
      return {
        keywork: '',
        list: [],
        notResult: false
      }
    },
    mounted() {
      this.$bus.$on('searchText', (res) => {
        this.keywork = res;
        if (this.keywork.length) {
          setTimeout(() => {
            this.keywork = res;
          }, 30);
        }
      })
    },
    methods: {
      scaleMove(iTarget, orgin) {
        if (iTarget) this.$refs.sub.style.display = 'block';
        let content = this.$refs.sub;
        clearInterval(itemr);
        let itemr = null;
        let count = orgin;
        let span = orgin ? -10 : 10;
        itemr = setInterval(() => {
          count =  count + span;
          content.style.webkitTransform = `scale(${count/100})`;
          content.style.backgroundColor = `rgba(255, 255, 255, ${count/100})`;
          if (count === iTarget){ 
            clearInterval(itemr);
            if (!iTarget) this.$refs.sub.style.display = 'none'; 
          }
        }, 20);
      } ,
      getSearchSuggest() {
        this.list = [];
        if (this.keywork.length !== 0) {
          searchSuggest(this.keywork, "mobile").then(res => {
            this.notResult = false;
            for (const item of res.result.allMatch) {
              this.list.push(item.keyword);
            }
          }).catch(() => {
            this.notResult = true;
          })
        }
      }
    },
    watch: {
      isShow() {
        if (this.isShow) {
          this.scaleMove(100, 0);
        }else {
          this.scaleMove(0, 100);
        }
      },
      keywork() {
        const func = debounce(this.getSearchSuggest, 1500);
        func();
      }
    }
  }
</script>

<style scoped>
  .search-suggest {
    width: 90%;
    position: fixed;
    left: 5%;
    top: 44px;
    z-index: 20;
    background-color: rgba(255, 255, 255, 0);
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
    transform: scale(0);
  }
    .search-key {
      color: rgb(89, 89, 248);
      padding: 0 15px;
      height: 45px;
      line-height: 45px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-all;
    }
    .search-result-item {
      color: #8a8a8a;
      padding: 0 15px;
      height: 45px;
      line-height: 45px;
      border-top: 1px solid #ececec;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-all;
    }
    .not-resutl {
      color: #8a8a8a;
      text-align: center;
      height: 45px;
      line-height: 45px;
      border-top: 1px solid #ececec;
    }
</style>