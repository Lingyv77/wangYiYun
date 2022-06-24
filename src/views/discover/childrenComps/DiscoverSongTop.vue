<template>
  <div class="discoverSongTop">
    <top-title :title='["新歌速递","查看更多"]' :path="'/discover/moreSongs'"/>
    <transform-swiper :song-list="songList"/>
  </div>
</template>

<script>
  import TopTitle from 'components/content/topTitle/TopTitle.vue'
  import TransformSwiper from 'components/content/transformSwiper/TransformSwiper'

  import { getSongsTop } from 'network/discover'
  
  export default {
    name: "DiscoverSongTop",
    data() {
      return {
        songList: [],
        countArray: 4, //二维数组个数 小音乐面数量,
        currentIndex: [0,1,2,3],
        countReduce: 3, //准许初次加载次数
      }
    },
    components: {
      TopTitle,
      TransformSwiper,
    },
    created() {
      //songList 规格赋值
      for(let i = 0; i < this.countArray; i++) {
        this.songList[i] = [];
      }
    
      this.getSongsTop();
    },
    methods: {
      getSongsTop() {
        clearTimeout(this.songTimer);
        if (this.countReduce) {
          this.countReduce--;
          getSongsTop(0).then(res => {
            // 存取需要的值数
            const list = []
            let result = res.data;
            for (const index in result) {
              if (index < this.countArray * 3) {
                list.push(result[index]);
              }
            }
            let listIndex = 0;
            for (let i = 0; i < this.countArray; i++) {
              let k = 3;
              while(k--) {
                this.songList[i].push({
                  id: list[listIndex].id, // 歌曲id
                  picUrl: list[listIndex].album.picUrl, // 歌曲封面
                  name: list[listIndex].name, // 歌曲名称
                  artists: list[listIndex].artists,  // 演唱者 
                })
                listIndex++;
              }
            }
          }).catch(() => {
            this.songTimer = setTimeout(() => {
              this.getSongsTop();
            }, 3000);
          })
        }
      }
    }
  }
</script>

<style scoped>
  .discoverSongTop {
    margin-top: 10px;
    overflow: hidden;
  }
</style>